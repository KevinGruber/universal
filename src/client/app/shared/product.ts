export interface Price {
	price: number;
	formatedPrice: string;
}

export interface Product {
	code: string;
	name: string;
	brand: string;
	price: Price;
	image: {
		url: string
	};
}
