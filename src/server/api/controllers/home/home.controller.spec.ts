import * as expect from 'expect';
import * as request from 'request';
import { Server } from '../../../module/server';

const URL = 'http://localhost:3101';

describe('Home Controller Testing', () => {

    before(() => {
        this.server = new Server();
        this.server.start(true);
    });

    after(() => {
        this.server.stop();
    });

    describe('GET /status', () => {

        it('returns status code 200', (done) => {
            request.get(`${URL}/status`, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it('returns UP and Running', (done) => {
            request.get(`${URL}/status`, (error, response, body) => {
                expect(body).toBe('UP and Running');
                done();
            });
        });
    });
});

