import { RateLimiterProvider, ServiceProvider, ServiceProviderOptions } from "types";
import { FlowClient } from "../../client/flow_client";


export type FlowServiceProviderOptions = ServiceProviderOptions<FlowClient>;

export class FlowServiceProvider extends ServiceProvider {
    private readonly client: FlowClient;
    private readonly rateLimitedProvider?: RateLimiterProvider;
    private readonly TICKET_WAIT_COUNT = 1;

    constructor(options: FlowServiceProviderOptions) {
        super();
        this.client = options.client;
        this.rateLimitedProvider = options.rateLimitedProvider;
    }

    private async __waitAndExecute<R>(fn: () => Promise<R>): Promise<R> {
        if (this.rateLimitedProvider) {
            await this.rateLimitedProvider().waitForTickets(
                this.TICKET_WAIT_COUNT
            );
        }
        return fn();
    }


    getLatestBlockHeight(): Promise<number> {
        return this.__waitAndExecute<number>(async () => {
            const block = await this.client.getLatestBlock();
            return block.height;
        });
    }

    getBlockAtHeight(height: number) {
        return this.__waitAndExecute(async () => {
            return await this.client.getBlockAtHeight(height);
        });
    }

    getCollection(collectionId: string) {
        return this.__waitAndExecute(async () => {
            return await this.client.getCollection(collectionId);
        });
    }

    getTransactionStatus(transactionId: string) {
        return this.__waitAndExecute(async () => {
            return await this.client.getTransactionStatus(transactionId);
        });
    }


    

}


