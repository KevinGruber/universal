import { Server } from '../../server/server';

export class Controller {
    constructor(private app: Server) {}

    get id() {
        return this.constructor.name;
    }

    get log() {
        return this.app.log;
    }

    get config() {
        return this.app.config;
    }

    get services() {
        return this.app.services;
    }
}
