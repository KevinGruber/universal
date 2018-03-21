import { IRouteMethod } from './route-methods';

export interface IRouteConfig {
    method: IRouteMethod;
    path: string;
    handler: string;
}
