import { IRouteMethod } from './route-methods';

export default interface IRouteConfig {
	path: string;
	method: IRouteMethod;
	controller: string;
}
