import { Server } from './server';

export class Controller {
	private app: Server;

	constructor(app: Server) {
		this.app = app;
	}

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