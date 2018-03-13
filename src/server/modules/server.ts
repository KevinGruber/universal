import * as Express from 'express';
import * as Compression from 'compression';
import Routes from '../config/routes';
import WebConfig from '../config/web';
import IRouteConfig from '../shared/route-config';
import * as Controllers from '../controllers';

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: Express.Application;
  public config: any;

  configure() {
    this.config = {
      port: process.env.PORT || WebConfig.port
    };

    this.app.use(Compression({
      filter: (req, res) => {
        if (req.headers['x-no-compression']) {
          return false;
        }
        return Compression.filter(req, res);
      }
    }));

    Routes.forEach((route: IRouteConfig) => {
      const controllerName = route.controller.split('.')[0];
      const actionName = route.controller.split('.')[1];
      const controller = Controllers[controllerName];
      if (controller) {
        this.app[route.method](route.path, controller[actionName]);
      }

    });
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = Express();

    this.configure();
  }

  start() {
    // Start up the Node server
    this.app.listen(this.config.port, () => {
      console.log(`Node Express server listening on http://localhost:${this.config.port}`);
    });
  }
}
