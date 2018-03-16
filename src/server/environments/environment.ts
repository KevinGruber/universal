export const environment = {
    env: 'development',
    web: {
        host: 'localhost',
        port: 3101
    },
    routes: [
        {
            method: 'GET',
            path: '/status',
            handler: 'HomeController.index'
        },
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
            handler: 'CartController.getCart'
        },
        {
            method: 'DELETE',
            path: '/jsapi/v1/cart/:cartId',
            handler: 'CartController.deleteCart'
        },
        {
            method: 'POST',
            path: '/jsapi/v1/cart/:cartId/entry',
            handler: 'CartController.postEntry'
        },
        {
            method: 'DELETE',
            path: '/jsapi/v1/cart/:cartId/entry',
            handler: 'CartController.deleteEntry'
        }
    ]
};
