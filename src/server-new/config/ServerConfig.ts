export interface IHybrisConfig {
    protocol?: string;
    host?: string;
    port?: string;
    url?: string;
}

export interface IGeneralConfig {
    environment: string;
    hostname: string;
    useReverseProxyForApi: boolean;
    allowedAliases: string[];
    port: string;
    host: string;
}

export interface IAppConfig {
    url?: string;
    appLogLevel: string;
    supportedLanguages: string[];
    defaultLanguage: string;
    environment: string;
    baseSite: string;
}

export interface IServerConfig {
    credentials?: {
        // frameFinder?: {
        //     username: string;
        //     password: string;
        // }
    };
}

export interface IConfig {
    general: IGeneralConfig;
    hybris: IHybrisConfig;
    app: IAppConfig;
    server: IServerConfig;
}

