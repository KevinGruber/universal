import { Request } from 'hapi';
import * as React from 'react';
import * as fs from 'fs';
import createMemoryHistory from 'history/createMemoryHistory';
import { ConnectedRouter } from 'connected-react-router';
import { renderToString } from 'react-dom/server';
import Helmet, { HelmetData } from 'react-helmet';
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config';
import * as Selectors from 'shop/client/reducers/selectors';
import StoreHelper from 'shop/client/stores/store';
import Logger from 'shop/client/utils/Logger';
import Routes from 'shop/client/routes';
import ResourceHelper from 'shop/server/utils/ResourceHelper';
import { IState } from 'shop/client/reducers';
import { Languages } from 'shop/client/interfaces/base/Language';
import ServerError from 'shop/server/errors/ServerError';
import { preloadAll } from 'shop/client/components/organisms/base/Loadable/Loadable';
import GoogleTagManager from 'shop/server/api/classes/GoogleTagManager';
import * as serialize from 'serialize-javascript';
import DataFetcher from 'shop/server/module/react/DataFetcher';
import { Middleware } from 'redux';
import Capture from 'shop/client/components/organisms/base/Capture/Capture';
import { uniqBy } from 'lodash';
import { Inject, Service } from 'typedi';
import { TranslationService } from 'shop/server/api/services';

// import Favicon from 'resources/icons/favicons/favicon.ico';
const isProduction = process.env.NODE_ENV === 'production';

@Service()
export class RenderService {

    @Inject()
    private translationService: TranslationService;

    svg: string;
    modules: string[] = [];
    initialData: any[] = [];
    messages: string[] = [];
    getBundles = (manifest: any, moduleIds: string[]) => {
        return moduleIds.reduce((bundles, moduleId) => {
            return bundles.concat(manifest[moduleId]);
        }, []);
    };
    generateCriticalCSS = (bundles: any[]) => {
        if (!isProduction) {
            return '';
        }
        const styles = this.filterBundles(bundles, 'css', 'publicPath');
        const inlineStyles = styles.map((bundle: any) => {
            return this.loadFile(bundle.publicPath, true);
        });
        return `<style>${inlineStyles.join('')}</style>`;
    };
    generateCriticalJS = (bundles: any[]) => {
        if (!isProduction) {
            return '';
        }
        const styles = this.filterBundles(bundles, 'js', 'publicPath');
        const inlineJS = styles.map((bundle: any) => {
            return this.loadFile(bundle.publicPath, true);
        });
        return `<script>${inlineJS.join('')}</script>`;
    };

    constructor() {
        // Standard styles which is normal relative path
        const mainSpritePath = ResourceHelper.getFile('/icons/symbols.svg');
        try {
            const spriteRaw = fs.readFileSync(mainSpritePath);
            this.svg = `<div aria-hidden="true" class="u-icon-sprite">${spriteRaw}</div>`;
        } catch (e) {
            this.svg = '';
        }
    }

    getStyles(bundles: any[], assets: any) {
        const styles = this.filterBundles(bundles, 'css');
        const loadableStyles = styles.map((bundle) => {
            // return `<link href="${bundle.publicPath}" rel="stylesheet"/>`;
            if (!isProduction) {
                return `<link href="${bundle.publicPath}" rel="stylesheet"/>`;
            }
            return `<link data-href="${bundle.publicPath}" href="" rel="stylesheet"/>`;
        });
        if (isProduction) {
            loadableStyles.unshift(
                `<link rel="stylesheet" href="/${assets['bundle.css']}"/>`
            );
        } else {
            loadableStyles.unshift(
                `<link rel=stylesheet href="http://127.0.0.1:3101/css/bundle.css"/>`
            );
        }
        return loadableStyles.join('\n');
    }

    getScripts(bundles: any[], assets: any) {
        const scripts = this.filterBundles(bundles, 'js');
        const loadableScripts = scripts.map((bundle) => {
            // need to be activated if use inline Initial JS
            // return `<script async="async" data-href="${bundle.publicPath}" src=""></script>`;
            return `<script async="async" src="${bundle.publicPath}"></script>`;
        });
        if (isProduction) {
            loadableScripts.push(
                `<script async="async" src="/${assets['runtime.js']}"></script>`,
                `<script async="async" src="/${assets['vendor.js']}"></script>`,
                `<script async="async" src="/${assets['bundle.js']}"></script>`
            );
        } else {
            // noinspection JSUnresolvedLibraryURL
            loadableScripts.push(
                `<script async="async" src="http://127.0.0.1:3101/js/bundle.js"></script>`
            );
        }
        return loadableScripts.join('\n');
    }

    filterBundles(bundles: any[], ext: string, by: string = 'publicPath') {
        return uniqBy(bundles.filter((b) => !!b).filter((bundle) => bundle.file.endsWith(`.${ext}`)), by);
    }

    loadFile(path: string, content?: boolean) {
        const file = ResourceHelper.getFile(path);
        try {
            return content ? fs.readFileSync(file, 'utf8') : __non_webpack_require__(file);
        } catch (e) {
            Logger.error(`Error during importing of the file: ${path}`);
            return {};
        }
    }

    resetRenderPass() {
        this.modules = [];
        this.initialData = [];
        this.messages = [];
    }

    getMarkup(language: Languages, helmet: HelmetData, markup: string, state: IState, request: Request, props: any) {
        Logger.debug(`Rendering: get markup`);

        const loadableStats = this.loadFile('/stats/react-loadable.json');
        const assets = this.loadFile('/stats/assets.json');
        const bundles = this.getBundles(loadableStats, this.modules);
        const scripts = this.getScripts(bundles, assets);
        const styles = this.getStyles(bundles, assets);
        const inlineStyles = this.generateCriticalCSS(bundles);
        // can be activated for faster first load
        // const inlineJS = this.generateCriticalJS(bundles);
        const inlineJS = '';
        const vwSettings = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no';

        const title = helmet && helmet.title && helmet.title.toString();
        const meta = helmet && helmet.meta && helmet.meta.toString();
        const link = helmet && helmet.link && helmet.link.toString();

        Logger.debug(`Rendering: return markup before`);
        return `<!DOCTYPE html>
                <html>
                    <head lang="${language || ''}">
                        <meta charSet="UTF-8" />
                        ${GoogleTagManager.buildGtmHeaders(helmet, state, request, markup, props)}
                        ${title}
                        <meta name="viewport" content="${vwSettings}">
                        ${meta}
                        ${link}
                        <meta name="apple-mobile-web-app-capable" content="yes">
                        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
                        <meta name="apple-touch-fullscreen" content="yes">
                        ${styles}
                        ${inlineStyles}
                        <link type="image/x-icon" href="/icons/favicon.ico" rel="shortcut icon">
                    </head>
                    <body>
                       ${this.svg || ''}
                       ${GoogleTagManager.buildGtmBody()}
                       <div id="app">${markup}</div>
                       <script id="state">window.__INITIAL_STATE__ = ${serialize(state)}</script>
                       ${scripts}
                       ${inlineJS}
                    </body>
                </html>`;
    }

    async render(url: string | undefined, request: Request, api: Middleware): Promise<string> {
        Logger.debug(`Rendering: ${url}`);
        this.resetRenderPass();
        Logger.debug(`Rendering: Resetted renderpass`);

        Logger.debug(`Rendering: createStore`);
        const serverHistory = createMemoryHistory({
            initialEntries: [request.path]
        });
        const store = StoreHelper.getStore(serverHistory);

        Logger.debug(`Rendering: getRoutes`);
        const captureModules = (moduleName: string) => this.modules.push(moduleName);
        const captureMessages = (getMessage: any) => this.messages.push(getMessage);

        Logger.debug(`Rendering: getInitial Fetch on Server`);
        // const initialData = [
        //     actionGetMessages(Languages.DE)
        // ];
        const initialData: any[] = [];

        const matchedRoutes = matchRoutes(Routes, request.path);
        const matchedLength = matchedRoutes.length || 0;
        const renderProps = matchedRoutes[matchedLength - 1].match || {};
        try {
            Logger.debug(`Rendering: preload on server`);
            await preloadAll();

            Logger.debug(`Data Fetching: started`);
            const dataFetcher = new DataFetcher(store, api);
            await dataFetcher.resolveInitialData(matchedRoutes, initialData);
            Logger.debug(`Data Fetching: finished`);

            const app = renderToString(
                <Capture report={captureModules} messages={captureMessages}>
                    <Provider store={store}>
                        <ConnectedRouter history={serverHistory}>
                            {renderRoutes(Routes)}
                        </ConnectedRouter>
                    </Provider>
                </Capture>
            );

            const helmet = Helmet.renderStatic();
            const state = store.getState();
            const language = Selectors.selectLanguage(state);

            Logger.debug(`Translations: prepare`);
            const optimizedState = this.translationService.optimizeMessages(this.messages, state);
            Logger.debug(`Translations: optimized`);

            const pageMarkup = this.getMarkup(language, helmet, app, optimizedState, request, renderProps);
            Logger.debug(`Rendering: html rendering finished`);
            return pageMarkup;
        } catch (e) {
            Logger.error(e);
            throw new ServerError('Server error.', url);
        }
    }
}

export default RenderService;
