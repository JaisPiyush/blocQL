import { LogProvider } from 'types';
import { Logger } from './logger';

export const logger: LogProvider = () => {
    return {
        debug: (...args) => {
            Logger.debug(args);
        },
        info(...args) {
            Logger.info(args);
        },
        warn(...args) {
            Logger.warn(args);
        },
        error(...args) {
            Logger.error(args);
        },
    };
};
