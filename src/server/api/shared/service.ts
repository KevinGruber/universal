import { IAppConfig } from './app-config';

export interface IService {
	id: string,
	log: any,
	config: IAppConfig,
	services: { [name: string]: IService }
}