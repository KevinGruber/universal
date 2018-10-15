import { Inject } from 'typedi';
import Logger from 'client/utils/Logger';
import { Request, ResponseToolkit } from 'hapi';
import { HttpService } from 'server-new/api/services/http/http.service';
import { HybrisService } from 'server-new/api/services/hybris/hybris.service';
import { AuthHttpService } from 'server-new/api/services/authHttp/authHttp.service';

interface IResponse {
    user: string;
    language: string;
    mandant: string;
    version: string;
}

export class UserController {

    @Inject()
    hybrisService: HybrisService;

    @Inject()
    httpService: HttpService;

    @Inject()
    authHttpService: AuthHttpService;

    async index(request: Request, h: ResponseToolkit) {
        Logger.info(`Controller UserController index requested`);
        const {version, language} = request.params;
        const url = `/jsapi/${version}/${language}/users`;
        const hybris = this.hybrisService.mapUrlToHybris(url, request);
        try {
            const response = await this.httpService.get<IResponse>(hybris.uri, {headers: hybris.headers});
            return h.response(response);
        } catch (e) {
            return this.httpService.logResponse(e, 'hapi hybris REST', null, true);
        }
    }

    async profile(request: Request, h: ResponseToolkit) {
        Logger.info(`Controller UserController profile requested`);
        const {version, language} = request.params;
        const url = `/jsapi/${version}/${language}/users/profile`;
        const hybris = this.hybrisService.mapUrlToHybris(url, request);

        try {
            const response = await this.authHttpService.get<IResponse>(hybris.uri, request, {headers: hybris.headers});
            return h.response(response);
        } catch (e) {
            return this.httpService.logResponse(e, 'hapi hybris REST', null, true);
        }
    }
}
