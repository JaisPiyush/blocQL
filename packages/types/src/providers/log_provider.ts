export interface LoggerInterface {
    debug(...args: unknown[]): any;

    info(...args: unknown[]): any;

    warn(...args: unknown[]): any;

    error(...args: unknown[]): any;
}

export type LogProvider = () => LoggerInterface;
