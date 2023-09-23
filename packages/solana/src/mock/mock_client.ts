import { web3 } from '..';
import { SolanaClient } from '../client/solana_client';
import { blockFixture } from '../processors/bloc_processor.fixture';

export class MockSolanaClient extends SolanaClient {
    constructor(public readonly fixture: typeof blockFixture) {
        super(new web3.Connection('devnet'));
    }

    async getLatestBlockHeight(): Promise<number> {
        return this.fixture.slot;
    }

    async getBlock(slot: number) {
        return this.fixture as any;
    }

    async getTransaction(signature: string) {
        for (const txn of this.fixture.transactions) {
            if (txn.transaction.signatures[0] === signature) {
                return txn as any;
            }
        }
    }

    async getAccountInfo(publicKey: web3.PublicKey) {
        return {} as any;
    }
}
