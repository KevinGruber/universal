import { IRouteMethod } from './route-methods';

export default interface IRouteConfig {
    method: IRouteMethod;
    path: string;
    handler: string;
}
