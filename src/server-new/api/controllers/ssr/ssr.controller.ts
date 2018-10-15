import { Request, ResponseToolkit } from 'hapi';
import { get } from 'lodash';
import { Languages } from 'client/interfaces/base/Language';
import Language from 'server-new/utils/Language';
import RoutingHooks from 'client/utils/RoutingHooks';
import Logger from 'client/utils/Logger';
import HttpConstants, { HTTP_HEADER, MIME_TYPE } from 'client/constants/HttpConstants';
import { Errors } from 'server-new/errors';
import Boom from 'boom';
import { ConfigService, RenderService } from 'server-new/api/services';
import { Inject } from 'typedi';
import { environment } from 'client/environments/environment';

export class SSRController {

    @Inject()
    private configService: ConfigService;

    @Inject()
    private renderService: RenderService;

    index(request: Request, h: ResponseToolkit) {
        Logger.info(`Controller SSRController index requested`);
        const {pathname: path, search: querystring} = request.url;
        const hostname = get(request, 'info.hostname');

        // check if it is allowed hostname alias
        const allowedAliases = environment.general.allowedAliases;
        const isAllowedAlias = allowedAliases && ((allowedAliases.indexOf(hostname) > -1) || (allowedAliases.indexOf('*') > -1));

        const languages = environment.app.supportedLanguages as Languages[];
        const preferredLanguage = Language.getPreferredLanguage(request, languages);
        let nextPath = RoutingHooks.fixLanguagePath(languages, path, preferredLanguage);
        nextPath = RoutingHooks.fixTrailingSlash(nextPath);

        const needsPathRedir = (nextPath !== path);
        const canonicalHostname = environment.general.hostname;

        const isCanonicalHost = canonicalHostname === hostname;
        const needsCanonicalHostRedir = (!isAllowedAlias) && (!isCanonicalHost);
        Logger.debug(`Rendering route: host ${hostname}, path ${path}, isCanonicalHost=${isCanonicalHost}, isAllowedAlias=${isAllowedAlias}`);

        if (needsPathRedir || needsCanonicalHostRedir) {
            if (querystring) {
                nextPath += querystring;
            }
            // skip canonical hostname redirects for localhost to simplify development
            // later if needed we call add configurable 'allowed aliases'
            const redirHost = isAllowedAlias ? '' : `https://${canonicalHostname}`;
            const redirTarget = redirHost + nextPath;
            Logger.debug(`Rendering route: redirect to ${redirTarget}, (original was ${path})`);
            return h.redirect(redirTarget);
        }

        Logger.debug(`Rendering route: initializing server side rendering of ${path}`);
        return this.renderService.render(path, request).then((renderOutput) => {
            return h.response(renderOutput).header(HTTP_HEADER.CONTENT_TYPE, MIME_TYPE.TEXT_HTML);
        }).catch((error: Errors) => {
            switch (error.name) {
                case 'RedirectError':
                    Logger.debug(`hapi rendering: redirect to ${error.url}`);
                    return h.redirect(error.url);
                case 'NotFoundError':
                    Logger.debug(`hapi rendering: 404 page for ${request.url.path}`);
                    return h.response(error.markup).code(HttpConstants.Code.CODE_404);
                default:
                    Logger.error(`hapi rendering: error: ${error.stack}`);
                    // this is usually JS error
                    return h.response('Unexpected condition was encountered').code(HttpConstants.Code.CODE_500);
            }
        }).catch((error: any) => {
            Logger.error('hapi rendering: died @ ' + JSON.stringify(error));
            // this is usually JS error
            return h.response(Boom.internal('Unexpected condition was encountered')).code(HttpConstants.Code.CODE_500);
        });
    }
}
