import { logger } from './logger';

export const runner = async (
    start: () => Promise<void>,
    stop: () => Promise<void>
) => {
    await start();

    const _logger = logger();

    await new Promise<void>((resolve) => {
        process.on('SIGTERM', () => {
            _logger.info('Received SIGTERM');
            resolve();
        });

        process.on('SIGINT', () => {
            _logger.info('Received SIGINT');
            resolve();
        });

        process.on('uncaughtException', (e) => {
            _logger.error(e);
            resolve();
        });

        process.on('unhandledRejection', (e) => {
            _logger.error(e);
            resolve();
        });
    });
    _logger.info('Stopping scanner');
    await stop();
    process.exit(0);
};

export const runScanner = runner;




