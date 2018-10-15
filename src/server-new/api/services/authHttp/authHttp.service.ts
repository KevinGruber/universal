import { Inject, Service } from 'typedi';
import { Request } from 'hapi';
import { HttpService } from 'server-new/api/services/http/http.service';
import CommonConstants from 'client/constants/CommonConstants';
import { HTTP_HEADER } from 'client/constants/HttpConstants';

@Service()
export class AuthHttpService {

    @Inject()
    httpService: HttpService;

    private _getAuthHeaders(request: Request, options: any) {
        const headers = {};
        const oAuthToken = request.state[CommonConstants.OAUTH_TOKEN_COOKIE];
        const sessionId = request.state[CommonConstants.SESSION_ID_COOKIE];
        if (oAuthToken) {
            headers[HTTP_HEADER.AUTHORIZATION] = `Bearer ${oAuthToken}`;
            headers[HTTP_HEADER.SESSION_ID] = sessionId;
        }
        return {
            ...options.headers,
            ...headers
        };
    };

    private _mapUserId(url: string, request: Request) {
        const userId = request.state[CommonConstants.USER_ID_COOKIE] || CommonConstants.ANONYMOUS_USER_ID;
        if (url.includes('users')) {
            const urlParts = url.split('/users');
            return urlParts.join(`/users/${userId}`);
        }
        return url;
    }

    get<T>(url: string, request: Request, options?: any) {
        const authHeaders = this._getAuthHeaders(request, options);
        const requestUrl = this._mapUserId(url, request);
        return this.httpService.get<T>(requestUrl, {...options, headers: authHeaders});
    }

    post<T>(url: string, body: any, request: Request, options?: any) {
        const authHeaders = this._getAuthHeaders(request, options);
        const requestUrl = this._mapUserId(url, request);
        return this.httpService.post<T>(requestUrl, body, {...options, headers: authHeaders});
    }

    put<T>(url: string, body: any, request: Request, options?: any) {
        const authHeaders = this._getAuthHeaders(request, options);
        const requestUrl = this._mapUserId(url, request);
        return this.httpService.put<T>(requestUrl, body, {...options, headers: authHeaders});
    }

    delete<T>(url: string, request: Request, options?: any) {
        const authHeaders = this._getAuthHeaders(request, options);
        const requestUrl = this._mapUserId(url, request);
        return this.httpService.delete<T>(requestUrl, {...options, headers: authHeaders});
    }
}
