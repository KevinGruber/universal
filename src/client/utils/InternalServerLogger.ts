import { environment } from 'client/environments/environment';
import { LogLevels } from 'client/interfaces/base/Logger';
import winston from 'winston';

const LVL_TRACE = 'trace';
const LVL_DEBUG = 'debug';
const LVL_INFO = 'info';
const LVL_WARN = 'warn';
const LVL_ERROR = 'error';

const ALLOWED_LEVELS = [LVL_TRACE, LVL_DEBUG, LVL_INFO, LVL_WARN, LVL_ERROR];

const WINSTON_LVL_DEBUG = LVL_DEBUG;
const WINSTON_LVL_TRACE = 'silly';

const checkAndFixLogLevel = (requestedLevel: LogLevels | number | string) => {
    let level = requestedLevel;
    if (!ALLOWED_LEVELS.find((l) => l === level)) {
        // default, if invalid value was passed
        level = LVL_INFO;
    }

    // translation between log level names used in our app and the backend (winston)
    if (level === LVL_TRACE) {
        level = WINSTON_LVL_TRACE;
    }

    return String(level);
};

export class InternalServerLogger {
    logger: winston.Logger;

    constructor(requestedLevel: LogLevels) {
        const level = checkAndFixLogLevel(requestedLevel);
        const cfg = {
            level,
            humanReadableUnhandledException: true,
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf((info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message}`)
            ),
            stderrLevels: [],
            // available log levels: error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
            transports: [
                new winston.transports.Console()
            ]
        };

        this.logger = winston.createLogger(cfg);
    }

    error(msg: string) {
        this.logger.error(msg);
    }

    info(msg: string) {
        this.logger.info(msg);
    }

    debug(msg: string) {
        this.logger.debug(msg);
    }

    silly(msg: string) {
        this.logger.silly(msg);
    }

    trace(msg: string) {
        this.logger.silly(msg);
    }

    isDebugEnabled() {
        const currentLevel = this.logger.level;
        return currentLevel === WINSTON_LVL_DEBUG || currentLevel === WINSTON_LVL_TRACE;
    }

    isTraceEnabled() {
        const currentLevel = this.logger.level;
        return currentLevel === WINSTON_LVL_TRACE;
    }

    setLogLevel(requestedLevel: LogLevels | number | string) {
        const level = checkAndFixLogLevel(requestedLevel);
        this.logger.level = String(level);
        return level;
    }
}

export default new InternalServerLogger(process.env.SERVER_LLEVEL as LogLevels || environment.logLevel as LogLevels || 'info');
