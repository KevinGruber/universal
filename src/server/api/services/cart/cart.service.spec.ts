import * as expect from 'expect';
import * as should from 'should';
import { Server } from 'module/server';
import { CartService } from './cart.service';

const CART_IPHONE = {
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
const CART_IPAD = {
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

const CART_ID = '451-5658-5626-895';

describe('Product Service Testing', () => {
    let cartService;

    beforeEach(() => {
        // here we need a full server instance because otherwiese the controllers are not
        // registered maybe in future i will add the controller and service insttiation to the mock
        const server = new Server();
        server.init();
        cartService = new CartService(server);
    });

    describe('Get a cart', () => {

        it('should give back an cart', () => {
            const cart = cartService.findCartById(CART_ID);
            expect(cart).toBeTruthy();
        });

        it('should give back no cart', () => {
            const cart = cartService.findCartById('2');
            expect(cart).toBeNull();
        });
    });

    describe('Manipulate Carts', () => {


        it('should add an iphone to the cart', () => {
            const cart = cartService.addProductToCart(CART_ID, '12345');
            expect(cart).toBeTruthy();
            expect(should(cart.products).containEql(CART_IPHONE)).toBeTruthy();
        });

        it('should add an ipad to the cart', () => {
            const cart = cartService.addProductToCart(CART_ID, '12245');
            expect(cart).toBeTruthy();
            expect(should(cart.products).containEql(CART_IPAD)).toBeTruthy();
        });

        it('should remove iphone from cart', () => {
            const cart = cartService.removeProductFromCart(CART_ID, '12345');
            expect(cart).toBeTruthy();
            expect(should(cart.products).not.containEql(CART_IPHONE)).toBeTruthy();
        });

        it('should clear the cart', () => {
            const cart = cartService.clearCart(CART_ID);
            expect(cart).toBeTruthy();
            expect(cart.products).toEqual([]);
        });
    });
});
