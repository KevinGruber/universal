import fs from 'fs';
import Path from 'path';
import { Server } from 'hapi';
import Logger from 'shop/client/utils/Logger';
import ResourceHelper from 'shop/server/utils/ResourceHelper';
import HttpConstants from 'shop/client/constants/HttpConstants';
import { IModule } from 'shop/server/interfaces/module';
import { RouteMethod } from 'shop/server/interfaces/route-methods';

class ResourceModule implements IModule {

    constructor() {
        Logger.info('ResourceModule registered');
    }

    register(server: Server) {
        server.route({
            method: RouteMethod.GET,
            path: '/css/{filename}',
            handler: (request, h) => {
                const url = ResourceHelper.getFile(request.path);
                Logger.trace(`styles route: requesting file ${url}`);
                // current temporary fix for changing urls' to cache busted ones in css
                if (fs.existsSync(url)) {
                    const stylesFileRaw = fs.readFileSync(url, 'utf8');
                    const stylesRaw = ResourceHelper.processCSS(stylesFileRaw);
                    const fileName = Path.basename(url);
                    return h.response(stylesRaw)
                        .header(HttpConstants.Header.CONTENT_TYPE, HttpConstants.MimeType.TEXT_CSS)
                        .header(HttpConstants.Header.CONTENT_DISPOSITION, `attachment; filename=${fileName};`);
                } else {
                    return h.response();
                }
            }
        });

        server.route({
            method: RouteMethod.GET,
            path: '/fonts/{filename*}',
            handler: (request, h) => {
                const url = ResourceHelper.getFile(request.path);
                Logger.trace(`fonts route: requesting file ${url}`);
                return h.file(url, {confine: false});
            }
        });

        server.route({
            method: RouteMethod.GET,
            path: '/js/{filename*}',
            handler: (request, h) => {
                const url = ResourceHelper.getFile(request.path);
                Logger.trace(`js route: requesting file ${url}`);
                return h.file(url, {confine: false});
            }
        });

        server.route({
            method: RouteMethod.GET,
            path: '/img/{filename*}',
            handler: (request, h) => {
                const url = ResourceHelper.getFile(request.path);
                Logger.trace(`img route: requesting file ${url}`);
                return h.file(url, {confine: false});
            }
        });

        server.route({
            method: RouteMethod.GET,
            path: '/icons/{filename*}',
            handler: (request, h) => {
                const url = ResourceHelper.getFile(request.path);
                Logger.trace(`icons route: requesting file ${url}`);
                return h.file(url, {confine: false});
            }
        });
    }
}

export default ResourceModule;
