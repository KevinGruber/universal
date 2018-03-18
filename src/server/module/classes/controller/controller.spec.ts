import * as expect from 'expect';
import { ServerMock } from '../../server';
import { Controller } from './controller';

const server = new ServerMock();
server.init();

describe('Controller Class Testing', () => {

    it('should be instantiatable', () => {
        const controller = new Controller(server);
        expect(controller).toBeTruthy();
        expect(controller.log).toBeTruthy();
        expect(controller.config).toBeTruthy();
        expect(controller.services).toBeTruthy();
        expect(controller.id).toBe('Controller');
    });

});

