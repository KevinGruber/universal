/* tslint:disable:no-console */
/**
 * Simple implementation of frontend logger
 *  we may later improve it or bind in some frontend logging library
 */

import { environment } from 'client/environments/environment';
import { LogLevels } from 'client/interfaces/base/Logger';

// browser console shortcuts:
//   window.nc.logger.setLevel('debug')
//   window.nc.logger.currentLevel
//   window.nc.logger.testMessages()
//   window.nc.logger.testConsole()

export class InternalAppLogger {
    currentLevel: LogLevels = LogLevels.DEBUG;

    constructor(requestedLevel: string) {
        this.setLogLevel(requestedLevel);
    }

    error(msg: string) {
        this._log(LogLevels.ERROR, msg);
    }

    warn(msg: string) {
        this._log(LogLevels.WARN, msg);
    }

    info(msg: string) {
        this._log(LogLevels.INFO, msg);
    }

    debug(msg: string) {
        this._log(LogLevels.DEBUG, msg);
    }

    trace(msg: string) {
        this._log(LogLevels.TRACE, msg);
    }

    // this may be used to prevent longer operations (like JSON.stringify) to execute is log level is higher then requested
    isDebugEnabled() {
        return this.currentLevel === LogLevels.DEBUG;
    }

    isTraceEnabled() {
        return this.currentLevel === LogLevels.TRACE;
    }

    /**
     * Set level.
     * Maybe used from browser console window e.g. as: window.ncAppLogger.setLevel('debug')
     * See also project readme.md
     *
     * @param requestedLevel error|warn|info|debug|trace (numeric values also accepted 0=error, 4=trace)
     */
    setLogLevel(requestedLevel: LogLevels | string | number) {
        this.currentLevel = this.convertLogLevels(requestedLevel);
        return '';
    }

    convertLogLevels(level: string | number) {
        switch (level) {
            case 0:
            case 'error':
                return LogLevels.ERROR;
            case 1:
            case 'warn':
                return LogLevels.WARN;
            case 2:
            case 'info':
                return LogLevels.INFO;
            case 3:
            case 'debug':
                return LogLevels.DEBUG;
            case 4:
            case 'trace':
                return LogLevels.TRACE;
        }
        return LogLevels.INFO;
    }

    /**
     * Output some test messages.
     */
    testMessages() {
        this.trace('test trace');
        this.debug('test debug');
        this.info('test info');
        this.warn('test warn');
        this.error('test error');
        return '';
    }

    _getLogFn(requestedLevel: LogLevels) {
        switch (requestedLevel) {
            case LogLevels.INFO:
                return console.info;
            case LogLevels.DEBUG:
                return console.debug;
            case LogLevels.WARN:
                return console.warn;
            case LogLevels.TRACE:
                return console.trace;
            case LogLevels.ERROR:
                return console.error;
            default:
                return console.log;
        }
    }

    _log(requestedLevel: LogLevels, msg: string) {
        const fn = this._getLogFn(requestedLevel);
        if (fn) {
            fn.apply(console, [msg]);
        }
    }
}

const appLogLevel = environment.logLevel ? environment.logLevel : LogLevels.INFO;
const Logger = new InternalAppLogger(appLogLevel);
export default Logger;
