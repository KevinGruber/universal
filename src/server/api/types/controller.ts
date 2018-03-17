import { IAppConfig } from './app-config';
import { IService } from './service';

export interface IController {
    id: string;
    log: any;
    config: IAppConfig;
    services: {
        [name: string]: IService;
    };
}
