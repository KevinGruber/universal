import { Server } from 'hapi';
import Logger from 'shop/client/utils/Logger';
import { IModule } from 'shop/server/interfaces/module';
import { RouteMethod } from 'shop/server/interfaces/route-methods';

// this can be used during development until backend part is ready
class MockModule implements IModule {

    constructor() {
        Logger.info('MockModule registered');
    }

    register(server: Server) {
        server.route({
            method: RouteMethod.GET,
            path: '/jsapi/v1/{language}/messages', handler: (request, h) => {
                const messages = require(`../../mock-responses/messages.${request.params.language}.json`);
                return h.response(messages);
            }
        });

        server.route({
            method: RouteMethod.GET,
            path: '/jsapi/v1/{language}/cms/content/{pageId}', handler: (request, h) => {
                const FrontPage = require(`../../mock-responses/${request.params.pageId}.json`);
                return h.response(FrontPage);
            }
        });
    }
}

export default MockModule;
