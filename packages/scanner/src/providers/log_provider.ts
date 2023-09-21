import { LogProvider } from 'types';

export const nullLogProvider: LogProvider = () => {
    return {
        debug: () => {},
        info: () => {},
        warn: () => {},
        error: () => {},
    };
};
