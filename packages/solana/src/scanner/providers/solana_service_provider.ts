import { ServiceProvider, ServiceProviderOptions } from "types";
import { RateLimiterProvider } from "types";
import { SolanaClient } from "../../client/solana_client";
import { PublicKey } from "@solana/web3.js";

export type SolanaServiceProviderOptions = ServiceProviderOptions<SolanaClient>;

export class SolanaServiceProvider extends ServiceProvider {

    private readonly client: SolanaClient;
    private readonly rateLimitedProvider?: RateLimiterProvider;
    private readonly  TICKET_WAIT_COUNT = 1;

    constructor(options: SolanaServiceProviderOptions) {
        super();
        this.client = options.client;
        this.rateLimitedProvider = options.rateLimitedProvider;
    }

    private async __waitAndExecute<R>(fn: () => Promise<R>): Promise<R> {
        if (this.rateLimitedProvider) {
            await this.rateLimitedProvider().waitForTickets(this.TICKET_WAIT_COUNT);
        }
        return fn();
    }

    async getLatestBlockHeight(): Promise<number> {
        return await this.__waitAndExecute<number>(async () => {
            return await this.client.getLatestBlockHeight();
        });
    }

    async getBlock(slot: number) {
        return await this.__waitAndExecute(async () => {
            return await this.client.getBlock(slot);
        });
    }

    async getTransaction(signature: string) {
        return await this.__waitAndExecute(async () => {
            return await this.client.getTransaction(signature);
        });
    }

    async getAccountInfo(publicKey: PublicKey) {
        return await this.__waitAndExecute(async () => {
            return await this.client.getAccountInfo(publicKey);
        });
    }


}