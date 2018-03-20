import { IRouteConfig } from './route-config';

export interface IAppConfig {
    env: string;
    web: {
        host: string;
        port: number;
    };
    routes: Array<IRouteConfig>;
}
