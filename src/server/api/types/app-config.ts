import IRouteConfig from './route-config';

export interface IAppConfig {
    client: any,
    server: {
        env: string,
        web: {
            host: string,
            port: number
        },
        routes: Array<IRouteConfig>
    };
}
