import { Connection, PublicKey } from '@solana/web3.js';

export class SolanaClient {
    constructor(private readonly connection: Connection) {}

    /**
     * Although the name of this method is `getLatestBlockHeight`, it actually returns the latest slot.
     * due to the fact that Solana uses slots instead of blockHeights to fetch blocks.
     *
     * @returns {number} - The latest slot
     */
    async getLatestBlockHeight(): Promise<number> {
        return await this.connection.getSlot();
    }

    /**
     *
     * @param slot - The slot of the block
     * @returns
     */
    async getBlock(slot: number) {
        return await this.connection.getParsedBlock(slot, {
            transactionDetails: 'accounts',
            maxSupportedTransactionVersion: 0,
            rewards: true,
        });
    }

    async getTransaction(signature: string) {
        return await this.connection.getParsedTransaction(signature, {
            maxSupportedTransactionVersion: 0,
        });
    }

    async getAccountInfo(publicKey: PublicKey) {
        return await this.connection.getParsedAccountInfo(publicKey);
    }
}
