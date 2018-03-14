import { Server } from './server';

export class Service {
	private app: Server;

	constructor(app: Server) {
		this.app = app;
	}

	get id() {
		return this.constructor.name
	}

	/**
	 * Return a reference to the Trails logger
	 */
	get log() {
		return this.app.log
	}

	/**
	 * Return a reference to the Trails configuration map.
	 */
	get config() {
		return this.app.config
	}

	get services() {
		return this.app.services
	}
}