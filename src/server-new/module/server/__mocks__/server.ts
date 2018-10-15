/**
 * A server Mock for testing.
 *
 * @class Server
 */

jest.mock('shop/server/utils/ResourceHelper');

export class Server {
    private readonly _controllers: any;

    constructor() {
        this._controllers = {};
    }

    async _init() {
        // this.registerServices();
        // this.registerController();
    }

    async _start(nolog?: boolean) {
        if (nolog) {
            return;
        }
        console.log('--------------------------------------------------------------------------------');
        console.log(`----------------------------- Mock Server Started ------------------------------`);
        console.log('--------------------------------------------------------------------------------');
    }

    async _stop() {
        console.log('Stop Server');
    }
}
