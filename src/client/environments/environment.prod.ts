import { LogLevels } from 'client/interfaces/base/Logger';
import { Languages } from 'client/interfaces/base/Language';

export const environment = {
    production: true,
    general: {
        allowedAliases: [],
        hostname: '0.0.0.0'
    },
    app: {
        supportedLanguages: [Languages.DE, Languages.IT, Languages.FR],
        logLevel: LogLevels.ERROR
    },
    server: 'http://localhost:3101/jsapi'
};
