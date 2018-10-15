import { get } from 'lodash';
import * as Boom from 'boom';
import * as Wreck from 'wreck';
import { Service } from 'typedi';
import Logger from 'client/utils/Logger';
import Config from 'server-new/config/ServerConfig';
import { ApiMethods } from 'shop/client/middleware/api';
import { HTTP_CODE, HTTP_HEADER, MIME_TYPE } from 'client/constants/HttpConstants';
import * as http from 'http';
import { RouteMethod } from 'server-new/interfaces';

@Service()
export class HttpService {

    private wreck: typeof Wreck;
    logResponse = (err: any, info: string, response: http.IncomingMessage | null, isBoom: boolean = false) => {
        let code: number = get(response, 'statusCode') || HTTP_CODE.CODE_500;
        let method: string = get(response, 'method') || RouteMethod.GET;
        let url = get(response, 'req') && get(response, 'req').path;
        let payload = {
            message: get(response, 'statusMessage'),
            error: get(response, 'statusMessage')
        };

        if (err) {
            method = err.trace[0].method;
            url = err.trace[0].url;
            payload = err.output.payload;
            code = err.output.statusCode;
        }

        if (err || code >= HTTP_CODE.CODE_300) {
            Logger.error(`${info}: ${method.toUpperCase()} ${url} got code=${code}, err=${payload.error}, message=${payload.message}`);
        }

        if (isBoom) {
            return new Boom(err);
        }
    };
    request = async <T>(method: ApiMethods, url: string, options: any = {}) => {
        try {
            const response = await this.wreck.request(method, url, options);
            return this.wreck.read(response, options) as Promise<T>;
        } catch (e) {
            throw e;
        }
    };

    constructor() {
        const wreckDefaults = {
            headers: {
                [HTTP_HEADER.CONTENT_TYPE]: MIME_TYPE.APPLICATION_JSON,
                [HTTP_HEADER.ACCEPT]: MIME_TYPE.APPLICATION_JSON,
                [HTTP_HEADER.ACCEPT_ENCODING]: HTTP_HEADER.ENCODING_IDENTITY
            },
            rejectUnauthorized: Config.hybris.protocol === 'https' ? Config.hybris.rejectUnauthorized : undefined
        };
        this.wreck = Wreck.defaults(wreckDefaults);
    }

    get<T>(url: string, options?: any) {
        return this.request<T>(ApiMethods.GET, url, options);
    }

    post<T>(url: string, body: any, options?: any) {
        return this.request<T>(ApiMethods.POST, url, {...options, payload: body});
    }

    put<T>(url: string, body: any, options?: any) {
        return this.request<T>(ApiMethods.PUT, url, {...options, payload: body});
    }

    delete<T>(url: string, options?: any) {
        return this.request<T>(ApiMethods.DELETE, url, options);
    }
}
