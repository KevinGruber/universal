import 'inert';
import 'h2o2';
import 'reflect-metadata';
import { get } from 'lodash';
import { Request, Server as HapiServer } from 'hapi';
import * as Controllers from 'server-new/api/controllers';
import { IRouteConfig } from 'server-new/interfaces/route-config';
import { ConfigService } from 'server-new/api/services/config/config.service';
import DeploymentUtils from 'server-new/utils/DeploymentUtils';
import Logger from 'client/utils/Logger';
import Cookies from 'server-new/api/classes/Cookies';
import CommonConstants from 'client/constants/CommonConstants';
import ServerRoutes from 'server-new/routes';
import { Container, Inject } from 'typedi';
import { IModule } from 'server-new/interfaces/module';
import HybrisModule, { ROUTE_LOGIN, ROUTE_LOGOUT } from 'server-new/api/modules/HybrisModule';
import MockModule from 'server-new/api/modules/MockModule';
import ResourceModule from 'server-new/api/modules/ResourceModule';
import { environment } from 'client/environments/environment';

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    @Inject()
    private configService: ConfigService;

    protected server: HapiServer;
    protected _staticDir: any;
    protected _controllers: { [name: string]: any };

    constructor() {
        this._controllers = {};
        Logger.info(`----------------------------------------------------------------------------------------------------`);
        Logger.info(`---------------------------------------- Create Server ---------------------------------------------`);
        Logger.info(`----------------------------------------------------------------------------------------------------`);
    }

    protected async _init() {
        Logger.info(`----------------------------------------------------------------------------------------------------`);
        this.initializeDirectories();
        this.initializeConfig();
        this.createServer();
        await this.configure();
    }

    protected initializeConfig() {
        if (!environment.hybris.rejectUnauthorized) {
            Logger.error(`\n\n\n****WARNING**** enabling use of selfsigned SSL certificates - this should NEVER be used in production\n\n\n`);

            // this is a hack to disable SSL check needed for Superagent api.js backend request calls
            // see http://visionmedia.github.io/superagent/
            // https://github.com/visionmedia/superagent/issues/926
            // it is important that Config.hybris.rejectUnauthorized===false is NEVER set for real production site

            // note that setting NODE_TLS_REJECT_UNAUTHORIZED will disable certificate checks for all https client calls
            // whis is unsecure

            // ***************** IMPORTANT ***************
            // currently qual-www & prod-www sites are signed by "Migros System CA 2"
            // nodejs doesn't recognise operating system CA list, we would need to pass CA certs manually
            // after particular mandant/site is going "really live" we MUST set rejectUnauthorized=true in prod.js
            // *****************
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }
        const useReverseProxyForApi = environment.general.useReverseProxyForApi;
        const reverseProxyHostName = environment.hybris.host;
        const newGeneralConfig = {
            ...environment.general,
            host: process.env.SERVER_HOST || environment.general.host,
            port: process.env.SERVER_PORT || environment.general.port
        };

        this.configService.config = {
            ...environment,
            general: newGeneralConfig,
            server: {
                ...{
                    routes: ServerRoutes,
                    url: useReverseProxyForApi ? `https://${reverseProxyHostName}` : `http://127.0.0.1:${newGeneralConfig.port}`,
                    staticDir: this._staticDir
                }
            }
        };
        Logger.info(`Config merged and initialized`);
    }

    protected initializeDirectories() {
        Logger.info(`----------------------------------------------------------------------------------------------------`);
        Logger.info(`Directories initialized`);
        this._staticDir = DeploymentUtils.staticDir;
    }

    protected initializeCookies() {
        Logger.info(`----------------------------------------------------------------------------------------------------`);
        Logger.info(`Cookies initialized`);
        const cookies = new Cookies(this.server);
        cookies.initialize();
    }

    protected async registerPlugins() {
        await this.server.register([
            require('inert'),
            require('h2o2'),
            {
                plugin: require('crumb'),
                options: {
                    restful: true,
                    // autogenerate doesn't suit our needs as we want to generate the token only at given times see addCSRFToken()
                    autoGenerate: false,
                    key: CommonConstants.CSRF_TOKEN_COOKIE,
                    skip: (request: Request) => {
                        const routepath = get(request, 'route.path');
                        return routepath === ROUTE_LOGIN || routepath === ROUTE_LOGOUT;
                    }
                }
            }
        ]);
        Logger.info(`Plugin inert registered`);
        Logger.info(`Plugin h2o2 registered`);
        Logger.info(`Plugin crumb registered`);
    }

    protected async configure() {
        await this.registerPlugins();
        this.initializeCookies();
        this.registerController();
        this.registerRoutes();
        this.registerModules();
    }

    protected async _start(nolog?: boolean) {
        try {
            await this.server.start();
            const serverLLevel = process.env.SERVER_LLEVEL || environment.app.logLevel;
            const uri = this.server && this.server.info ? this.server.info.uri : '';
            if (nolog) {
                return;
            }
            const hybris = this.configService.config.hybris;
            const server = this.configService.config.server;
            Logger.info(`----------------------------------------------------------------------------------------------------`);
            Logger.info(`---------------------------------------- Server Started --------------------------------------------`);
            Logger.info(`----------------------------------------------------------------------------------------------------`);
            Logger.info(`URL: ${uri}`);
            Logger.info(`ENVIRONMENT=${environment.app.environment}`);
            Logger.info(`NODE_ENV=${process.env.NODE_ENV}`);
            Logger.info(`APP_CODE=${process.env.APP_CODE}`);
            Logger.info(`LOG_LEVEL=${serverLLevel}`);
            Logger.info(`STATIC_DIR=${server.staticDir}) `);
            Logger.info(`BASE_URL=${server.url}`);
            Logger.info(`HYBRIS_API=${hybris.apiUrl}`);
            Logger.info(`HYBRIS_URL=${hybris.protocol}://${hybris.host}:${hybris.port}`);
            Logger.info(`PID=${process.pid}`);
            Logger.info(`----------------------------------------------------------------------------------------------------`);
            Logger.info(`----------------------------------------------------------------------------------------------------`);
        } catch (e) {
            if (e) {
                Logger.error(e);
                throw e;
            }
        }
    }

    protected async _stop() {
        await this.server.stop();
        Logger.info(`----------------------------------------------------------------------------------------------------`);
        Logger.info(`---------------------------------------- Server Stopped --------------------------------------------`);
        Logger.info(`----------------------------------------------------------------------------------------------------`);
        process.exit(0);
    }

    protected registerRoutes() {
        Logger.info(`----------------------------------------------------------------------------------------------------`);
        this.configService.config.server.routes.forEach((route: IRouteConfig) => {
            const handler = route.handler.split('.');
            const handlerName = handler[0];
            const actionName = handler[1];
            const controller = this._controllers[handlerName];
            if (controller && controller[actionName]) {
                Logger.info(`Routes ${route.method} ${route.path} -> ${route.handler} registered`);
                this.server.route({
                    path: route.path,
                    method: route.method,
                    handler: controller[actionName].bind(controller),
                    options: route.options
                });
            }
        });
    }

    protected registerModules() {
        Logger.info(`----------------------------------------------------------------------------------------------------`);
        const modules = [MockModule, ResourceModule, HybrisModule];
        modules.forEach((m) => {
            const moduleInstance: IModule = Container.get(m);
            moduleInstance.register(this.server);
        });
    }

    protected registerController() {
        Logger.info(`----------------------------------------------------------------------------------------------------`);
        Object.keys(Controllers).forEach((controller) => {
            const ControllerInstance = Container.get(Controllers[controller]);
            Logger.info(`Controller ${controller} registered`);
            this._controllers[controller] = ControllerInstance;
        });
    }

    private createServer() {
        this.server = new HapiServer({
            host: this.configService.config.general.host,
            port: this.configService.config.general.port,
            state: {
                // If your cookie format is not RFC 6265, set this param to false.
                strictHeader: false
            },
            routes: {
                files: {
                    relativeTo: this._staticDir
                },
                payload: {
                    maxBytes: 5242880
                }
            }
        });
    }

    public async init() {
        return this._init();
    }

    public async start(nolog?: boolean) {
        return this._start(nolog);
    }

    public async stop() {
        return this._stop();
    }
}
