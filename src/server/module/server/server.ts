import { enableProdMode, ValueProvider } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as BodyParser from 'body-parser';
import * as Compression from 'compression';
import * as Express from 'express';
import { readFileSync } from 'fs';
import * as http from 'http';
import { isEmpty, merge } from 'lodash';
import { join } from 'path';

import 'reflect-metadata';
// Angular Specific Stuff
import 'zone.js/dist/zone-node';
import * as Controllers from 'api/controllers';
import * as Services from 'api/services';
import { IAppConfig } from 'api/types/app-config';
import { IController } from 'api/types/controller';
import { IRouteConfig } from 'api/types/route-config';
import { IService } from 'api/types/service';

const DIST_FOLDER = join(process.cwd(), 'dist');

declare const __non_webpack_require__: Function;

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    protected server: http.Server;
    protected express: Express.Application;

    protected _config: IAppConfig;

    public get config() {
        return this._config;
    }

    protected _services: { [name: string]: IService };

    public get services() {
        return this._services;
    }

    protected _controllers: { [name: string]: IController };

    public get controllers() {
        return this._controllers;
    }

    protected _log: any;

    public get log() {
        return this._log;
    }

    constructor() {
        this._controllers = {};
        this._services = {};
        this._log = {};
    }

    protected _init() {
        this.express = Express();
        this.configure();
    }

    protected mergeConfig(): IAppConfig {
        const cwd = process.cwd();
        const cli = require(join(cwd, '.angular-cli.json'));
        const environmentBasePath = cli.apps[0].environmentSource;
        const environmentPath = cli.apps[0].environments[Server.getEnvironment()];

        const {environment: clientBase} = require(join(cwd, 'src/client/', environmentBasePath));
        const {environment: clientEnv} = require(join(cwd, 'src/client/', environmentPath));

        const {environment: serverBase} = require(join(cwd, 'src/server/', environmentBasePath));
        const {environment: serverEnv} = require(join(cwd, 'src/server/', environmentPath));

        const mergedClientConfig = merge(clientBase, clientEnv, {cwd});
        const mergedServerConfig = merge(serverBase, serverEnv, {cwd});

        return {
            client: mergedClientConfig,
            server: mergedServerConfig
        };
    }

    protected configure() {
        this._config = this.mergeConfig();

        this.express.use(BodyParser.urlencoded({extended: false}));
        this.express.use(BodyParser.json());

        this.express.use(Compression({
            filter: (req, res) => {
                if (req.headers['x-no-compression']) {
                    return false;
                }
                return Compression.filter(req, res);
            }
        }));

        this.registerServices();
        this.registerController();
        this.registerRoutes();
    }

    protected _start(nolog?: boolean) {
        this.server = this.express.listen(this.config.server.web.port, this.config.server.web.host, () => {
            if (nolog) {
                return;
            }
            console.log('--------------------------------------------------------------------------------');
            console.log(`----------- Node Express server listening on http://${this.config.server.web.host}:${this.config.server.web.port} -------------`);
            console.log('--------------------------------------------------------------------------------');
        });
    }

    protected _stop() {
        this.server.close();
        console.log('Stop Server');
    }

    protected registerRoutes() {
        this.config.server.routes.forEach((route: IRouteConfig) => {
            const handler = route.handler.split('.');
            const handlerName = handler[0];
            const actionName = handler[1];
            const controller = this.controllers[handlerName];
            if (controller && controller[actionName]) {
                this.express[route.method.toLowerCase()](route.path, controller[actionName].bind(controller));
            }
        });
    }

    protected registerServices() {
        Object.keys(Services).forEach(service => {
            const ServiceInstance = new Services[service](this, this.express);
            this.services[ServiceInstance.id] = ServiceInstance;
        });
    }

    protected registerController() {
        Object.keys(Controllers).forEach(controller => {
            const ControllerInstance = new Controllers[controller](this);
            this.controllers[ControllerInstance.id] = ControllerInstance;
        });
    }

    protected _registerSSR() {
        this.express.set('view engine', 'html');
        this.express.set('views', join(DIST_FOLDER, 'browser'));
        const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require(join(DIST_FOLDER, 'server/main.bundle'));

        enableProdMode();

        const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

        this.express.engine('html', (_, options, callback) => {
            renderModuleFactory(AppServerModuleNgFactory, {
                document: template,
                url: options.req.url,
                extraProviders: [
                    <ValueProvider>{
                        provide: REQUEST,
                        useValue: options.req
                    },
                    <ValueProvider>{
                        provide: RESPONSE,
                        useValue: options.req.res
                    },
                    provideModuleMap(LAZY_MODULE_MAP)
                ]
            }).then(html => {
                callback(null, html);
            });
        });

        // Serve static content
        this.express.get('*.*', Express.static(join(DIST_FOLDER, 'browser'), {
            maxAge: '1y'
        }));

        // Main Controller for SSR
        this.express.get('*', (req, res, next) => {
            if (req.url.startsWith('/jsapi')) {
                return next();
            }
            res.render('index', {req, res});
        });
    }

    public static getEnvironment() {
        const envArg = process.argv.find(a => a.includes('env'));
        const value = Array.isArray(envArg) && envArg.split('=');
        if (!isEmpty(value)) {
            return value[1];
        }
        return 'dev';
    }

    public init() {
        this._init();
    }

    public registerSSR() {
        this._registerSSR();
    }

    public start(nolog?: boolean) {
        this._start(nolog);
    }

    public stop() {
        this._stop();
    }
}
