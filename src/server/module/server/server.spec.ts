import * as expect from 'expect';
import * as request from 'request';
import { Server } from './server';

const URL = 'http://localhost:3101/';

describe('Server is Running', () => {

    before(() => {
        this.server = new Server();
        this.server.init();
        this.server.start(true);
    });

    after(() => {
        this.server.stop();
    });

    describe('GET /not-found', () => {

        it('returns status code 404', (done) => {
            request.get(`${URL}/not-found`, (error, response) => {
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });
});

