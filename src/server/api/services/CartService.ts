import { Service } from '../../module/service';

export class CartService extends Service {

	findCartById(cartId: string) {
		return {
			cartId,
			products: [
				{
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
				}
			]
		}
	}

	addProductToCart(cartId: string, productCode: string, amount: number) {
		const products = [];
		for (let productCount = 0; productCount < amount; productCount++) {
			products.push({
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
			})

		}
		return {
			cartId,
			products: [
				{
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
				},
				...products
			]
		}
	}
}
