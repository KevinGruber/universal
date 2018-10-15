import { Languages } from 'client/interfaces/base/Language';

const extractLanguage = (path: string | null) => {
    if ((typeof path !== 'string') || (!path.startsWith('/'))) {
        // invalid input
        return null;
    }

    const re = new RegExp('^/([a-z][a-z])(/.*)?$');
    const ex = re.exec(path);
    const language = ex && ex[1] !== 'cp' ? ex[1] : null;
    return language;
};

/**
 * Check whenever the language parameter is valid language; if not then do a redirect
 * @param languages Array of accepted languages in shop.
 * @param path Current url path (e.g. '/aa/bb')
 * @param preferredLanguage optional preffered language. If left blank, then first language is used.
 * @returns In case path already contains supported language, then just return passed path, else
 *    prepend language to url.
 *    E.g. '/de/aaa' => '/de/aaa'; '/xxxx/aaa' => '/de/xxxx/aaa'; '/en/aa' => 'de/aa'
 *
 *    query is not the most elegant solution to append again should be looked at in the future.
 */
const fixLanguagePath = (languages: Languages[], path: string | undefined, preferredLanguage: Languages) => {
    if ((typeof path !== 'string') || (!path.startsWith('/'))) {
        // invalid input
        return null;
    }

    if ((!Array.isArray(languages)) || (languages.length <= 0)) {
        // unexpected content of language array
        return path;
    }

    const language = extractLanguage(path);
    if (!preferredLanguage) {
        preferredLanguage = languages[0];
    }

    if (!language) {
        // preffered language is the first one in the list
        path = '/' + preferredLanguage + path;
    } else if (languages.indexOf(language as Languages) === -1) {
        // language present but it is not one of supported ones and not a content page
        path = '/' + preferredLanguage + path.substring(3);
    }
    return path;
};

/**
 * Fix traling slash at url path. Url is not expected to contain querystring.
 * @return {*} Url path, without trailing / at end.
 */
const fixTrailingSlash = (path: string | null) => {
    if ((typeof path !== 'string') || (!path.startsWith('/'))) {
        // invalid input
        return null;
    }

    // #2 check trailing '/' and the end of path
    while ((path.length > 1) && (path[path.length - 1] === '/')) {
        path = path.substring(0, path.length - 1);
    }
    return path;
};

export default {
    fixLanguagePath,
    fixTrailingSlash,
    extractLanguage
};
