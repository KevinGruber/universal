/**
 * A server Mock for testing.
 *
 * @class Server
 */
import { Server } from '../server';
import { IAppConfig } from 'api/types/app-config';

export class ServerMock extends Server {

    constructor() {
        super();
        this._controllers = {};
        this._services = {};
        this._log = {};
    }

    protected _init() {
        this._config = this._mergeConfig();
        this.server = null;
        this.express = null;

        this.registerServices();
        this.registerController();
    }

    protected _start(nolog?: boolean) {
        if (nolog) {
            return;
        }
        console.log('--------------------------------------------------------------------------------');
        console.log(`----------- Node Express server listening on http://${this.config.server.web.host}:${this.config.server.web.port} -------------`);
        console.log('--------------------------------------------------------------------------------');
    }

    protected _stop() {
        console.log('Stop Server');
    }

    protected _registerSSR() {
        console.log('Register SSR');
    }

    protected _mergeConfig(): IAppConfig {
        return {
            client: {},
            server: {
                env: 'mock',
                web: {
                    host: '',
                    port: 1234
                },
                routes: []
            }
        };
    }
}
