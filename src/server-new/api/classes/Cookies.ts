import CommonConstants from 'client/constants/CommonConstants';
import Config from 'server-new/config/ServerConfig';
import { Server } from 'hapi';

// declare all server side cookies
class Cookies {
    useSecureCookies: boolean = false;

    constructor(private server: Server) {
        this.useSecureCookies = Config.general.useSecureCookies;
    }

    initialize() {
        this.server.state(CommonConstants.SESSION_ID_COOKIE, {
            ttl: CommonConstants.SESSION_COOKIE_MAX_AGE * 1000,
            isSecure: this.useSecureCookies,
            path: '/',
            isHttpOnly: true,
            encoding: 'none',
            clearInvalid: true,
            strictHeader: true
        });

        this.server.state(CommonConstants.CART_ID_COOKIE, {
            ttl: CommonConstants.SESSION_COOKIE_MAX_AGE * 1000,
            isSecure: this.useSecureCookies,
            path: '/',
            isHttpOnly: true,
            encoding: 'none',
            clearInvalid: true,
            strictHeader: true
        });

        this.server.state(CommonConstants.USER_ID_COOKIE, {
            ttl: CommonConstants.SESSION_COOKIE_MAX_AGE * 1000,
            isSecure: this.useSecureCookies,
            path: '/',
            isHttpOnly: true,
            encoding: 'none',
            clearInvalid: true,
            strictHeader: true
        });

        this.server.state(CommonConstants.OAUTH_TOKEN_COOKIE, {
            ttl: CommonConstants.SESSION_COOKIE_MAX_AGE * 1000,
            isSecure: this.useSecureCookies,
            path: '/',
            isHttpOnly: true,
            encoding: 'none',
            clearInvalid: true,
            strictHeader: true
        });
    }
}

export default Cookies;
