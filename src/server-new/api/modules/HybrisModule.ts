import 'h2o2';
import { Server } from 'hapi';
import { Inject } from 'typedi';
import Logger from 'shop/client/utils/Logger';
import { ConfigService } from 'shop/server/api/services';
import { IModule, RouteMethod } from 'shop/server/interfaces';
import CommonConstants from 'shop/client/constants/CommonConstants';
import { HybrisService } from 'shop/server/api/services/hybris/hybris.service';

const {JS_API_URL, HYBRIS_URL} = CommonConstants;
export const ROUTE_LOGIN = `${JS_API_URL}/v1/{language}/login`;
export const ROUTE_LOGOUT = `${JS_API_URL}/v1/{language}/logout`;
export const ROUTE_REGISTER = `${JS_API_URL}/v1/{language}/register`;

class HybrisModule implements IModule {

    @Inject()
    configService: ConfigService;

    @Inject()
    hybrisService: HybrisService;

    constructor() {
        Logger.info('HybrisModule registered');
    }

    register(server: Server) {
        server.route({
            method: [RouteMethod.PUT, RouteMethod.POST, RouteMethod.GET, RouteMethod.DELETE],
            path: `${JS_API_URL}/{url*}`,
            handler: {
                proxy: {
                    passThrough: false,
                    redirects: this.configService.config.hybris.redirects,
                    rejectUnauthorized: this.configService.config.hybris.rejectUnauthorized,
                    mapUri: this.hybrisService.mapRequest,
                    onResponse: this.hybrisService.handleResponse('hapi hybris REST proxy')
                }
            } as any
        });

        server.route({
            method: [RouteMethod.PUT, RouteMethod.POST, RouteMethod.GET, RouteMethod.DELETE],
            path: `${HYBRIS_URL}/{url*}`,
            handler: {
                proxy: {
                    uri: this.hybrisService.proxyMapping,
                    passThrough: true,
                    redirects: this.configService.config.hybris.redirects,
                    rejectUnauthorized: this.configService.config.hybris.rejectUnauthorized,
                    onResponse: this.hybrisService.handleResponse('hapi hybris REST proxy')
                }
            } as any
        });
    }
}

export default HybrisModule;
