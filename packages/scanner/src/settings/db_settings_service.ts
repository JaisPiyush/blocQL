import { SettingsServiceInterface } from 'types';
import knex, { Knex } from 'knex';

export class DbSettingsService implements SettingsServiceInterface {

    constructor(
        private readonly db: Knex,
        private readonly tableName: string,
        private readonly keyName: string = 'processed-block-height',
        private readonly destroyDb: boolean = false
    ) {}

    private getDb = async (): Promise<Knex> => {
        return this.db;
    };

    getProcessedBlockHeight = async () => {
        const db = await this.getDb();

        const setting = await db(this.tableName)
            .where('key', this.keyName)
            .first();

        return setting ? Number(setting.value) : undefined;
    };

    setProcessedBlockHeight = async (blockHeight: number) => {
        const db = await this.getDb();
        await db(this.tableName)
            .insert({
                key: this.keyName,
                value: String(blockHeight),
            })
            .onConflict(['key'])
            .merge();
    };

    destroy = async () => {
        if (this.db && this.destroyDb) {
            await this.db.destroy();
        }
    };
}
