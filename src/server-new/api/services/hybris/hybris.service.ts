import { omit } from 'lodash';
import { Inject, Service } from 'typedi';
import { stringify } from 'query-string';
import Logger from 'client/utils/Logger';
import { Request, ResponseObject, ResponseToolkit } from 'hapi';
import { IHeader } from 'server-new/interfaces/request';
import { RouteMethod } from 'server-new/interfaces';
import { HTTP_CODE, HTTP_HEADER } from 'client/constants/HttpConstants';
import CommonConstants from 'client/constants/CommonConstants';
import { ConfigService } from 'server-new/api/services';
import { IConfig } from 'server-new/config/ServerConfig';
import { HttpService } from 'server-new/api/services/http/http.service';
import * as Boom from 'boom';
import * as http from 'http';

export interface IHybrisRequest {
    uri: string;
    headers: IHeader;
}

@Service()
export class HybrisService {

    private _getQueryString = (request: Request) => {
        let queryString = '';
        const isGet = request.method === RouteMethod.GET;
        const isPost = request.method === RouteMethod.POST;
        if ((isGet || isPost) && request.query) {
            queryString = stringify(request.query as any);
        }
        return queryString;
    };
    private _getRequestHeader = (requestHeaders: IHeader, name: string) => {
        return requestHeaders && (requestHeaders[name] || requestHeaders[name.toLowerCase()]) || '';
    };
    private _getWhitelistedRequestHeaders = (reqHeaders: IHeader) => {
        const hdrAccept = this._getRequestHeader(reqHeaders, HTTP_HEADER.ACCEPT);
        const hdrUserAgent = this._getRequestHeader(reqHeaders, HTTP_HEADER.USER_AGENT);
        const hdrAcceptLanguage = this._getRequestHeader(reqHeaders, HTTP_HEADER.ACCEPT_LANGUAGE);
        const hdrCookie = this._getRequestHeader(reqHeaders, HTTP_HEADER.COOKIE);
        const hdrContentType = this._getRequestHeader(reqHeaders, HTTP_HEADER.CONTENT_TYPE);

        const headers = {};
        if (hdrAccept) {
            headers[HTTP_HEADER.ACCEPT] = hdrAccept;
        }
        if (hdrUserAgent) {
            headers[HTTP_HEADER.USER_AGENT] = hdrUserAgent;
        }
        if (hdrAcceptLanguage) {
            headers[HTTP_HEADER.ACCEPT_LANGUAGE] = hdrAcceptLanguage;
        }
        if (hdrCookie) {
            headers[HTTP_HEADER.COOKIE] = hdrCookie;
        }
        if (hdrContentType) {
            headers[HTTP_HEADER.CONTENT_TYPE] = hdrContentType;
        }
        return headers;
    };
    private _cleanupHybrisResponseHeaders = (headers: any, response: ResponseObject) => {
        const cleanedHeaders = omit(headers, [
            HTTP_HEADER.SET_COOKIE,
            HTTP_HEADER.SET_COOKIE.toLowerCase(),
            HTTP_HEADER.CONTENT_LENGTH,
            HTTP_HEADER.CONTENT_LENGTH.toLowerCase()
        ]);
        for (const name in cleanedHeaders) {
            if (cleanedHeaders.hasOwnProperty(name)) {
                response.header(name, headers[name]);
            }
        }
        return response;
    };
    private _getForwardedFor = (headers: IHeader) => {
        if (!headers) {
            return undefined;
        }

        let header = this._getRequestHeader(headers, HTTP_HEADER.X_BALANCED_FOR) || this._getRequestHeader(headers, HTTP_HEADER.X_FORWARDED_FOR);
        header = (header.split(',')[0]).trim();
        return header;
    };
    private _mapOutgoingUrl = (outgoingUrl: string, queryString: string, headers: IHeader, config: IConfig) => {
        const port = config.hybris.port;
        let portSuffix = port ? `:${port}` : '';
        const protocol = config.hybris.protocol;

        // 443 with https is redundant
        if ((port === '443') && (protocol === 'https')) {
            portSuffix = '';
        }

        const host = config.hybris.host;
        const hostWithPort = host + portSuffix;

        let uri = `${protocol}://${hostWithPort}${outgoingUrl}`;
        if (queryString) {
            uri += `?${queryString}`;
        }
        // we need to pass "Host" header as nginx will need it to identify virtual server
        headers = {
            ...headers,
            ...{
                Host: hostWithPort
            }
        };
        headers = omit(headers, [HTTP_HEADER.CONTENT_LENGTH, HTTP_HEADER.CONTENT_LENGTH.toLowerCase()]);
        return {uri, headers};
    };
    @Inject()
    configService: ConfigService;
    @Inject()
    httpService: HttpService;
    public handleResponse = (info: string) => (err: any, res: http.IncomingMessage, request: Request, h: ResponseToolkit) => {
        if (!err) {
            Logger.trace(`${info}: receiving the response from the upstream`);
        }
        this.httpService.logResponse(err, info, res);

        if (res) {
            const response = h.response(res);
            response.code(res.statusCode || HTTP_CODE.CODE_500);
            this._cleanupHybrisResponseHeaders(res.headers, response);
            return response;
        } else {
            return Boom.boomify(err);
        }
    };
    public mapRequest = (request: Request) => {
        const path = request.path;
        const queryString = this._getQueryString(request);
        const headers = request.headers;
        return this.mapUrlToHybris(
            path,
            headers,
            queryString
        );
    };

    public get proxyMapping() {
        const hybris = this.configService.config.hybris;
        return `${hybris.protocol}://${hybris.host}:${hybris.port}/{path}`;
    }

    public mapUrlToHybris(path: string, request: Partial<Request>, queryString: string = ''): IHybrisRequest {
        const config = this.configService.config;
        const headers = request.headers || {};
        const method = request.method || RouteMethod.GET;
        const whitelistedHeaders = this._getWhitelistedRequestHeaders(headers);
        const expectedPrefix = [`${CommonConstants.JS_API_URL}/v`];
        if (expectedPrefix.includes(path)) {
            Logger.error(`mapUrlPathToHybrisUrl mapping failed for path=${path} qs=${queryString}`);
            return {
                uri: 'http://failed.mapping',
                headers: {}
            };
        }
        path = path.substring(CommonConstants.JS_API_URL.length);
        const urlParts = path.split('/');

        // try to read the "forwarded for IP" from request (if request is available)
        const forwardedForIpAddress = this._getForwardedFor(whitelistedHeaders);
        const userAgent = this._getRequestHeader(whitelistedHeaders, HTTP_HEADER.USER_AGENT);
        // if found, then add it to passed headers
        const newHeaders = {
            ...(whitelistedHeaders || {}),
            ...(forwardedForIpAddress ? {[HTTP_HEADER.FORWARDED_FOR_NODEJS]: forwardedForIpAddress} : {}),
            ...(userAgent ? {[HTTP_HEADER.USER_AGENT]: userAgent} : {}),
            [HTTP_HEADER.ACCEPT_ENCODING]: HTTP_HEADER.ENCODING_IDENTITY
        };

        // expected url looks like: '/v1/xxxxxxx/yyyyy'
        // currently internal we use urls without mandant and the mandant param is
        // added in the proxy
        const versionUrlPart = urlParts[1];
        const outgoingUrl = `${config.hybris.apiUrl}/${versionUrlPart}/${config.app.baseSite}/${urlParts.slice(2).join('/')}`;

        if (Logger.isDebugEnabled()) {
            Logger.debug(`hapi hybris REST proxy ${path} => ${method.toUpperCase()} ${outgoingUrl}`);
        }

        if (Logger.isTraceEnabled()) {
            Logger.trace(`hapi hybris REST proxy ${path} => ${method.toUpperCase()} ${outgoingUrl}, req.headers=${JSON.stringify(newHeaders)}`);
        }
        return this._mapOutgoingUrl(outgoingUrl, queryString, newHeaders, config);
    }
}
