import { Service } from 'typedi';
import { IRouteConfig } from 'server-new/interfaces';
import { IConfig } from 'server-new/config/ServerConfig';

export type IServerConfig = IConfig & {
    server: {
        routes: IRouteConfig[];
        url: string;
        staticDir: string;
    }
};

@Service()
export class ConfigService {

    protected _config: IServerConfig = {} as IServerConfig;

    get config() {
        return this._config;
    }

    set config(config: IServerConfig) {
        this._config = config;
    }
}
