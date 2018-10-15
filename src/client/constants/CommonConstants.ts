export default {
    // internal API url (between react and HybrisProxy (hapi))
    JS_API_URL: '/jsapi',
    HYBRIS_URL: '/dglwebservices',

    // CSRF token cookie name
    CSRF_TOKEN_COOKIE: 'ncx',
    // session cookie name
    SESSION_ID_COOKIE: 'ncs',
    // Rich Relevance session cookie name
    RR_SESSION_ID_COOKIE: 'ncrs',
    // cartId cookie name
    CART_ID_COOKIE: 'ncc',
    // userId cookie name
    USER_ID_COOKIE: 'ncu',
    // userId cookie name
    OAUTH_TOKEN_COOKIE: 'nct',

    // if this file exists, alive check will report "unavailable/maintenance"
    FILE_MAINTENANCE: 'maintenance',

    // Maximal age in seconds (24 hours)
    // Note, that the real limit on the session length/timeout is on server side
    // (currently ~30 minutes). Here we intentionaly use much longer time, then on server server side.
    // So in normal use cases, the cookies will "never" expire, but the session may become
    // invalid on server side.
    // This reduces the complexity a bit, but even if cookies expire, it should be handled correctly.
    SESSION_COOKIE_MAX_AGE: 24 * 3600,

    ANONYMOUS_USER_ID: 'anonymous',

    // price formatting
    THOUSANDS_SEPARATOR: String.fromCharCode(8217),
    DECIMAL_SEPARATOR: '.',

    // delay in ms to update the state when resizing window
    WINDOW_RESIZE_DELAY: 100,

    // delay in ms to refresh session
    SESSION_REFRESH_DELAY: 30 * 1000,

    MAX_FIELD_SIZE: 255,
    TEXTAREA_ROWS: 8,

    HTTP_CODE_200: 200,
    HTTP_CODE_400: 400,
    HTTP_CODE_500: 500,

    LINK_TARGET_NEW: 'newWindow',

    // fieldset level helper
    FIELDSET_BASIC_LEVEL: 'BASIC',
    FIELDSET_FULL_LEVEL: 'FULL',
    FIELDSET_DEFAULT_LEVEL: 'DEFAULT',

    RADIOCHECKBOX_TYPE: 'radio',
    CHECKBOX_TYPE: 'checkbox',

    SEARCH_QUERY_PARAMETER: 'q',

    CRITICAL_STYLE_SELECTOR: 'jsCriticalCSS'
};
