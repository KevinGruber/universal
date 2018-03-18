import * as expect from 'expect';
import * as request from 'request';
import { Server } from '../../../module/server';


const URL = 'http://localhost:3101';
const PRODUCT_IPHONE = {
    code: 12345,
    name: 'iPhone5',
    brand: 'Apple',
    price: {
        price: 800.00,
        formatedPrice: 'EUR 800.00'
    },
    image: {
        url: 'http://via.placeholder.com/350x150'
    }
};
const PRODUCT_IPAD = {
    code: 12245,
    name: 'iPadAir3',
    brand: 'Apple',
    price: {
        price: 1200.00,
        formatedPrice: 'EUR 1200.00'
    },
    image: {
        url: 'http://via.placeholder.com/350x150'
    }
};

describe('Product Controller Testing', () => {

    before(() => {
        this.server = new Server();
        this.server.init();
        this.server.start(true);
    });

    after(() => {
        this.server.stop();
    });

    describe('GET /jsapi/v1/product/12345', () => {


        it('returns status code 200', (done) => {
            request.get(`${URL}/jsapi/v1/product/12345`, (error, response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it('returns Product', (done) => {
            request.get(`${URL}/jsapi/v1/product/12345`, (error, response, body) => {
                expect(body).toEqual(JSON.stringify(PRODUCT_IPHONE));
                done();
            });
        });
    });

    describe('GET /jsapi/v1/product/12245', () => {

        it('returns status code 200', (done) => {
            request.get(`${URL}/jsapi/v1/product/12245`, (error, response) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it('returns Product', (done) => {
            request.get(`${URL}/jsapi/v1/product/12245`, (error, response, body) => {
                expect(body).toEqual(JSON.stringify(PRODUCT_IPAD));
                done();
            });
        });
    });
});

