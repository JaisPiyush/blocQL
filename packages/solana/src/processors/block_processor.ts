import {
    BroadcastData,
    SolanaBlockMessage,
    SolanaDataBroadcastType,
    SolanaDatastoreName,
    SolanaTransactionMessage,
} from '../types';
import { SolanaProcessor } from './processor';
import { SolanaBlockModel } from 'types/src/models/solana/block';
import { SolanaRewardModel } from 'types/src/models/solana/reward';

export class SolanaBlockProcessor extends SolanaProcessor<SolanaBlockMessage> {
    protected async __process(
        data: BroadcastData<SolanaBlockMessage>
    ): Promise<void> {
        const logger = this.providers.logProvider();
        try {
            const serviceProvider = await this.providers.serviceProvider();
            const datastore = await this.providers.datastoreProvider(
                SolanaDatastoreName.BlockDatastore
            );
            const dataBroadcasterProvider =
                await this.providers.dataBroadcasterProvider(
                    SolanaDataBroadcastType.TransactionBroadcast
                );
            const block = await serviceProvider.getBlock(data.payload.slot);
            const _block: SolanaBlockModel = {
                slot: data.payload.slot,
                parent_slot: data.payload.parentSlot,
                block_hash: data.payload.blockhash,
                block_time: new Date(data.payload.blockTime as number * 1000),
                block_height: data.payload.blockHeight,
                block_date: new Date(data.payload.blockTime as number * 1000),
                tx_count: block.transactions.length,
                tx_success_count: 0,
                tx_error_count: 0,
                successful_vote_txn_count: 0,
                failed_vote_txn_count: 0,
                successful_non_vote_txn_count: 0,
                failed_non_vote_txn_count: 0,
                total_vote_txn_count: 0,
                total_non_vote_txn_count: 0,
            };

            await datastore.insert(_block);
            logger.info(`Inserted block ${data.payload.slot} into datastore`);

            if (data.payload.rewards) {
                await this.__processReward(data);
            }

            if (!block.transactions) {
                return;
            }

            let txnIndex = 0;
            let txnMessageTracker = 0;
            while (txnIndex < block.transactions.length) {
                const endIndex =
                    txnIndex + 100 < block.transactions.length
                        ? txnIndex + 100
                        : txnIndex + 50 < block.transactions.length
                        ? txnIndex + 50
                        : block.transactions.length;
                const txns = block.transactions.slice(txnIndex, endIndex);

                await dataBroadcasterProvider.broadcast({
                    id: `${data.payload.slot}_${txnIndex}_${endIndex}`,
                    data: {
                        target: SolanaDataBroadcastType.TransactionBroadcast,
                        payload: txns.map<SolanaTransactionMessage>((txn) => {
                            const data: SolanaTransactionMessage = {
                                index: txnMessageTracker,
                                signature: txn.transaction.signatures[0],
                            };
                            txnMessageTracker++;
                            return data;
                        }),
                    },
                });
                txnIndex = endIndex;
            }

            logger.info(
                `Broadcasted transactions ${block.transactions.length} for block ${data.payload.slot}`
            );
        } catch (err) {
            logger.error(
                `SolanaBlockProcessor Error processing block ${
                    data.payload.slot
                }: ${err} ${(err as Error).stack}`
            );
        }
    }

    private async __processReward(data: BroadcastData<SolanaBlockMessage>) {
        const datastore = await this.providers.datastoreProvider(
            SolanaDatastoreName.RewardDatastore
        );
        const logger = this.providers.logProvider();

        if (!data.payload.rewards) {
            return;
        }

        const rewards = data.payload.rewards.map<SolanaRewardModel>(
            (reward) => {
                const preBalance =
                    reward.postBalance === null
                        ? 0
                        : reward.postBalance -
                          reward.lamports -
                          (reward.commission ?? 0);
                return {
                    recipient: reward.pubkey,
                    lamports: reward.lamports,
                    commission: reward.commission,
                    reward_type: reward.rewardType,
                    post_balance: reward.postBalance ?? 0,
                    pre_balance: preBalance,
                    block_hash: data.payload.blockhash,
                    slot: data.payload.slot,
                    block_time: new Date(data.payload.blockTime as number * 1000),
                    block_date: new Date(data.payload.blockTime as number * 1000),
                };
            }
        );

        if (rewards.length > 0) {
            await Promise.all(
                rewards.map(async (reward) => {
                    await datastore.insert(reward);
                })
            );
        }
        logger.info(
            `Inserted ${rewards.length} rewards into datastore for block ${data.payload.slot}`
        );
    }
}
