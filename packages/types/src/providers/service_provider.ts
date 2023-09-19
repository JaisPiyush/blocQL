import { ClientProvider } from "./client_provider";
import { RateLimiterProvider } from "./rate_limited_provider";

export interface BaseBlock {
    blockHeight: number;
}


export class ServiceProvider {
    async getLatestBlockHeight(): Promise<number> {
        throw new Error('Not implemented');
    }

}
export interface ServiceProviderOptions<T> {
    client: T;
    rateLimitedProvider?: RateLimiterProvider
}