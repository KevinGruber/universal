import { IRouteConfig } from 'shop/server/interfaces';
import { RouteMethod } from 'shop/server/interfaces/route-methods';

const ServerRouteConfig: IRouteConfig[] = [
    {
        method: RouteMethod.GET,
        path: '/{path*}',
        handler: 'SSRController.index'
    },
    {
        method: RouteMethod.GET,
        path: '/status',
        handler: 'StatusController.index'
    },
    {
        method: RouteMethod.GET,
        path: `/jsapi/{version}/{language}/users`,
        handler: 'UserController.index'
    },
    {
        method: RouteMethod.GET,
        path: `/jsapi/{version}/{language}/users/profile`,
        handler: 'UserController.profile'
    }
    // {
    //     // method: [RouteMethod.PUT, RouteMethod.POST, RouteMethod.GET, RouteMethod.DELETE],
    //     // path: `${JS_API}/{url*}`,
    //     // // handler: 'HybrisController.index',
    // }
];

export default ServerRouteConfig;
