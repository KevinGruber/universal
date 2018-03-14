export const environment = {
	env: 'development',
	web: {
		host: "localhost",
		port: 3101,
	},
	routes: [
		{
			method: 'GET',
			path: '/jsapi/v1/product/:code',
			handler: 'ProductController.index'
		},
		{
			method: 'GET',
			path: '/jsapi/v1/cms/:cmsPageId',
			handler: 'CMSController.index'
		},
		{
			method: 'GET',
			path: '/jsapi/v1/cart/:cartId',
			handler: 'CartController.get'
		},
		{
			method: 'POST',
			path: '/jsapi/v1/cart/:cartId',
			handler: 'CartController.post'
		}
	]
};
