/**
 * HTTP and related constants.
 */

/*
    URL_GIF: Url group identification (see nc-nginx/include.d/common-locations.conf)
*/
export enum HTTP_HEADER {
    ACCEPT = 'Accept',
    ACCEPT_ENCODING = 'Accept-Encoding',
    ACCEPT_LANGUAGE = 'Accept-Language',
    AUTHORIZATION = 'Authorization',
    CONTENT_TYPE = 'Content-Type',
    CONTENT_DISPOSITION = 'Content-Disposition',
    CONTENT_LENGTH = 'Content-length',
    COOKIE = 'Cookie',
    URL_GID = 'X-NC-URLGid',
    SESSION_ID = 'Session-Id',
    USER_AGENT = 'User-Agent',
    CSRF = 'X-CSRF-Token',
    FORWARDED_FOR_NODEJS = 'X-Forwarded-For-NodeJS',
    SET_COOKIE = 'Set-Cookie',
    WWW_AUTHENTICATE = 'WWW-Authenticate',
    ENCODING_IDENTITY = 'identity',
    X_BALANCED_FOR = 'X-Balanced-For',
    X_FORWARDED_FOR = 'X-Forwarded-For',
    X_FORWARDED_PROTO = 'X-Forwarded-Proto',
    X_PROXY_NAME = 'X-Proxy-Hostname'
}

export enum MIME_TYPE {
    APPLICATION_JSON = 'application/json',
    TEXT_CSS = 'text/css',
    TEXT_HTML = 'text/html; charset=utf-8',
    MULTIPART_FORMDATA = 'multipart/form-data',
    FORM_URLENCODED = 'application/x-www-form-urlencoded'
}

export enum HTTP_CODE {
    CODE_200 = 200,
    CODE_300 = 300,
    CODE_201 = 201,
    CODE_400 = 400,
    CODE_404 = 404,
    CODE_500 = 500,
}

export default {
    Code: HTTP_CODE,
    MimeType: MIME_TYPE,
    Header: HTTP_HEADER
};
