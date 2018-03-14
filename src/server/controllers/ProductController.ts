
export class ProductController {
	static index(req, res) {
		const { code } = req.params;
		switch (code) {
			case '12345':
				return res.json({
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
				});
			default:
				return res.json({
					code: 12234,
					name: 'iPadAir3',
					brand: 'Apple',
					price: {
						price: 1200.00,
						formatedPrice: 'EUR 1200.00'
					},
					image: {
						url: 'http://via.placeholder.com/350x150'
					}
				});
		}
	}
}
