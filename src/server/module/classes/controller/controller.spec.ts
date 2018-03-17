import * as expect from 'expect';
import { Server } from '../../server';
import { Controller } from './controller';

const server = new Server();

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

