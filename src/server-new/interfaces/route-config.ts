import { RouteMethod } from './route-methods';
import { RouteOptions } from 'hapi';

export interface IRouteConfig {
    method: RouteMethod | RouteMethod[];
    path: string;
    handler: string;
    options?: RouteOptions
}
