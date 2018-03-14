
export class CartController {
	static get(req, res) {
		const { cartId } = req.params;
		return res.json({
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
		});
	}
	static post(req, res) {
		const { cartId } = req.params;
		const { amount, code } = req.payload;
		return res.json({
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
		});
	}
}
