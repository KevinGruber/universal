import { Service } from '../../../module/classes/service';

export class ProductService extends Service {

    findById(code) {
        switch (code) {
            case '12345':
                return {
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
            case '12245':
                return {
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
            default:
                return null;
        }
    }
}