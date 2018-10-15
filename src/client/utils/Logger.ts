import { InternalAppLogger } from 'client/utils/InternalAppLogger';
import { InternalServerLogger } from 'client/utils/InternalServerLogger';

let Logger: InternalAppLogger | InternalServerLogger;
if (process.env.APP_CODE === 'server') {
    Logger = require('client/utils/InternalServerLogger').default;
} else {
    Logger = require('client/utils/InternalAppLogger').default;
}
export default Logger;
