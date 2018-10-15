import { Languages } from 'shop/client/interfaces/base/Language';
import { Request } from 'hapi';

const {language: getLanguage} = require('accept');

export function getPreferredLanguage(request: Request, supportedLanguages: Languages[]) {
    let preferredLanguage: Languages = getLanguage(request.headers['accept-language'], supportedLanguages);
    if (!preferredLanguage) {
        preferredLanguage = supportedLanguages[0];
    }
    return preferredLanguage;
}

export function __setPreferredLanguage(language: Languages) {
    // do nothing just for testing
    return language;
}

export default {
    getPreferredLanguage,
    __setPreferredLanguage
};
