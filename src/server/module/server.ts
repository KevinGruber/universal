import * as Express from 'express';
import * as Compression from 'compression';
import * as BodyParser from 'body-parser';
import { isEmpty, merge } from 'lodash';
import IRouteConfig from '../api/shared/route-config';
import * as Controllers from '../api/controllers';
import * as Services from '../api/services';


// Angular Specific Stuff
// (global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode, ValueProvider } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';
import { readFileSync } from 'fs';
import { join } from 'path';

const DIST_FOLDER = join(process.cwd(), 'dist');

import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine';
import { IAppConfig } from '../api/shared/app-config';
import { IController } from '../api/shared/controller';
import { IService } from '../api/shared/service';
import { environment } from '../environments/environment';

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public express: Express.Application;
  public config: IAppConfig;
  public log: any;
  public services: { [name: string]: IService };
  public controllers: { [name: string]: IController };

  constructor() {
    this.controllers = {};
    this.services = {};
    this.log = {};

    this.express = Express();

    this.configure();
  }

  configure() {
    this.config = this.mergeConfig();

    this.express.use(BodyParser.urlencoded({ extended: false }))
    this.express.use(BodyParser.json())

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

  mergeConfig(): IAppConfig {
    const cwd = process.cwd();
    const cli = require(join(cwd, '.angular-cli.json'));
    const environmentBasePath = cli.apps[0].environmentSource;
    const environmentPath = cli.apps[0].environments[this.getEnvironment()];

    const { environment: clientBase } = require(join(cwd, 'src/client/', environmentBasePath));
    const { environment: clientEnv } = require(join(cwd, 'src/client/', environmentPath));

    const { environment: serverBase } = require(join(cwd, 'src/server/', environmentBasePath));
    const { environment: serverEnv } = require(join(cwd, 'src/server/', environmentPath));

    const mergedClientConfig = merge(clientBase, clientEnv, { cwd });
    const mergedServerConfig = merge(serverBase, serverEnv, { cwd });

    return {
      client: mergedClientConfig,
      server: mergedServerConfig
    };
  }

  getEnvironment() {
    const value = process.argv.find(a => a.includes('env')).split('=');
    if (!isEmpty(value)) {
      return value[1];
    }
    return 'dev'
  }

  registerRoutes() {
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

  registerServices() {
    Object.keys(Services).forEach(service => {
      const ServiceInstance = new Services[service](this);
      this.services[ServiceInstance.id] = ServiceInstance;
    });
  }

  registerController() {
    Object.keys(Controllers).forEach(controller => {
      const ControllerInstance = new Controllers[controller](this);
      this.controllers[ControllerInstance.id] = ControllerInstance;
    });
  }


  registerSSR() {
    this.express.set('view engine', 'html');
    this.express.set('views', join(DIST_FOLDER, 'browser'));
    const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(join(DIST_FOLDER, 'server/main.bundle'));

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
            useValue: options.req.res,
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
      if (req.url.startsWith('/jsapi')) { return next(); }
      res.render('index', { req, res });
    });
  }

  start() {
    this.express.listen(this.config.server.web.port, this.config.server.web.host, () => {
      console.log('--------------------------------------------------------------------------------')
      console.log('#################################  NG SHOP  ####################################')
      console.log('--------------------------------------------------------------------------------')
      console.log(`########### Node Express server listening on http://${this.config.server.web.host}:${this.config.server.web.port} #############`);
      console.log('--------------------------------------------------------------------------------')
      console.log('################################################################################')
      console.log('--------------------------------------------------------------------------------')
    });
  }
}
