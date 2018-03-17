import * as expect from 'expect';
import { Server } from '../../server';
import { Service } from './service';

const server = new Server();

describe('Service Class Testing', () => {

    it('should be instantiatable', () => {
        const service = new Service(server);
        expect(service).toBeTruthy();
        expect(service.log).toBeTruthy();
        expect(service.config).toBeTruthy();
        expect(service.services).toBeTruthy();
        expect(service.id).toBe('Service');
    });

});

