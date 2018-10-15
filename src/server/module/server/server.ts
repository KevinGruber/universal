import { enableProdMode } from '@angular/core';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as BodyParser from 'body-parser';
import * as Compression from 'compression';
import * as Express from 'express';
import * as http from 'http';
import { merge } from 'lodash';
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
import { ngExpressEngine } from '@nguniversal/express-engine';

const DIST_FOLDER = join(process.cwd(), 'dist');

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
        const {environment: serverBase} = require('environments/environment.ts');
        // TODO add dynamic Config building or before hand with build step.
        return merge(serverBase, {});
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
        this.server = this.express.listen(this.config.web.port, this.config.web.host, () => {
            if (nolog) {
                return;
            }
            console.log('--------------------------------------------------------------------------------');
            console.log(`----------- Node Express server listening on http://${this.config.web.host}:${this.config.web.port} -------------`);
            console.log('--------------------------------------------------------------------------------');
        });
    }

    protected _stop() {
        this.server.close();
        console.log('Stop Server');
    }

    protected registerRoutes() {
        this.config.routes.forEach((route: IRouteConfig) => {
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

    protected _registerSSR(bundle: any) {
        this.express.set('view engine', 'html');
        this.express.set('views', join(DIST_FOLDER, 'browser'));
        const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = bundle;

        enableProdMode();

        this.express.engine('html', ngExpressEngine({
            bootstrap: AppServerModuleNgFactory,
            providers: [
                provideModuleMap(LAZY_MODULE_MAP)
            ]
        }));

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

    public init() {
        this._init();
    }

    public registerSSR(bundle: any) {
        this._registerSSR(bundle);
    }

    public start(nolog?: boolean) {
        this._start(nolog);
    }

    public stop() {
        this._stop();
    }
}
