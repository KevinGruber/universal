export default [
	{
		path: '/jsapi/v1/product/:code',
		method: 'get',
		controller: 'ProductController.index'
	},
	{
		path: '/jsapi/v1/cms/:cmsPageId',
		method: 'get',
		controller: 'CMSController.index'
	},
	{
		path: '/jsapi/v1/cart/:cartId',
		method: 'get',
		controller: 'CartController.get'
	},
	{
		path: '/jsapi/v1/cart/:cartId',
		method: 'post',
		controller: 'CartController.post'
	}
];
