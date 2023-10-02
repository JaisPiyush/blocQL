import { FlowBlock, FlowCollection, FlowTransactionStatus } from '../types';
import { customDecoders } from './decoder';
import * as fcl from '@onflow/fcl';

export class FlowClient {
    constructor(private readonly accessNode: string) {
        this.setCustomDecoders().then();
    }

    async setCustomDecoders() {
        for (const [key, func] of Object.entries(customDecoders)) {
            if ((await fcl.config().get(`decoder.${key}`, null)) === null) {
                await fcl.config().put(`decoder.${key}`, func);
            }
        }
    }

    getLatestBlock = async (): Promise<FlowBlock> => {
        const latestBlock = (await fcl
            .send([await fcl.build([fcl.getBlock(true)])], {
                node: this.accessNode
            })
            .then(fcl.decode)) as FlowBlock;
        return latestBlock;
    };

    getBlockAtHeight = async (height: number): Promise<FlowBlock> => {
        const block = (await fcl
            .send(
                await fcl.build([fcl.getBlock(), fcl.atBlockHeight(height)]),
                {
                    node: this.accessNode
                }
            )
            .then(fcl.decode)) as FlowBlock;
        return block;
    };

    getCollection = async (collectionId: string): Promise<FlowCollection> => {
        const collection = (await fcl
            .send(await fcl.build([fcl.getCollection(collectionId)]), {
                node: this.accessNode
            })
            .then(fcl.decode)) as FlowCollection;
        return collection;
    };

    getTransactionStatus = async (
        transactionId: string
    ): Promise<FlowTransactionStatus> => {
        const txn = await fcl
            .send(await fcl.build([fcl.getTransactionStatus(transactionId)]), {
                node: this.accessNode
            })
            .then(fcl.decode);
        return txn as FlowTransactionStatus;
    };
}