import * as expect from 'expect';
import { Server } from 'module/server';
import { ProductService } from './product.service';

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
const PRODUCT_EMPTY = null;

describe('Product Service Testing', () => {
    let productService;

    before(() => {
        productService = new ProductService(new Server());
    });

    describe('findByPageId', () => {


        it('returns iPhone', () => {
            const product = productService.findById('12345');
            expect(product).toEqual(PRODUCT_IPHONE);
        });

        it('returns iPad', () => {
            const product = productService.findById('12245');
            expect(product).toEqual(PRODUCT_IPAD);
        });

        it('returns empty', () => {
            const product = productService.findById('404');
            expect(product).toEqual(PRODUCT_EMPTY);
        });
    });
});
