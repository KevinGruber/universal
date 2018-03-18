import * as expect from 'expect';
import { ServerMock } from 'module/server';
import { Service } from './service';

const server = new ServerMock();
server.init();

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

