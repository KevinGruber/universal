// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { LogLevels } from 'client/interfaces/base/Logger';
import { Languages } from 'client/interfaces/base/Language';

export const environment = {
    production: false,
    general: {
        environment: 'n/a',
        hostname: 'localhost',
        useReverseProxyForApi: false,
        allowedAliases: ['*'],
        port: '3100',
        host: '127.0.0.1'
    },
    hybris: {
        protocol: 'https',
        host: '127.0.0.1',
        port: '9002',
        rejectUnauthorized: false,
        url: '/rest'
    },
    app: {
        supportedLanguages: [Languages.DE, Languages.IT, Languages.FR],
        logLevel: LogLevels.DEBUG,
        url: `/jsapi`
    }
};
