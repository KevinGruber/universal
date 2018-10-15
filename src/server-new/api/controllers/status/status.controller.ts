import { Request, ResponseToolkit } from 'hapi';
import Logger from 'client/utils/Logger';

export class StatusController {

    index(request: Request, h: ResponseToolkit) {
        Logger.info(`Controller StatusController index requested`);
        return h.response('UP and Running');
    }
}
