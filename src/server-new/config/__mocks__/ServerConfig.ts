'use strict';

// let use fixed config for the tests (means we ignore current real impl.)
const ConfigMocked = {
    general: {
        host: 'localhost',
        port: '1234',

        allowedAliases: ['localhost'],
        hostname: 'www.netconomy.net'
    },
    hybris: {
        host: 'localhost',
        port: '9001',
        protocol: 'http',
        rejectUnauthorized: false,
        redirects: 5
    },
    app: {
        mandant: 'netconomy.net',
        supportedLanguages: ['de', 'it', 'fr']
    }
};

export default ConfigMocked;
