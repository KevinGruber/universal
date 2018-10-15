import { Inject } from 'typedi';
import { ConfigService } from 'server-new/api/services';
import Logger from 'client/utils/Logger';
import { HybrisService } from 'server-new/api/services/hybris/hybris.service';

export class HybrisController {

    @Inject()
    configService: ConfigService;

    @Inject()
    hybrisService: HybrisService;

    index() {
        Logger.info(`Controller HybrisController index requested`);
        return {
            proxy: {
                passThrough: false,
                redirects: this.configService.config.hybris.redirects,
                rejectUnauthorized: this.configService.config.hybris.rejectUnauthorized,
                mapUri: this.hybrisService.mapRequest,
                onResponse: this.hybrisService.handleResponse('hapi hybris REST proxy')
            }
        };
    }
}
