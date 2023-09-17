import { ClientProvider } from "./client_provider";
import { RateLimiterProvider } from "./rate_limited_provider";

export interface BaseBlock {
    height: number;
}


export class ServiceProvider {
    async getLatestBlockHeight(): Promise<number> {
        throw new Error('Not implemented');
    }
}
export interface ServiceProviderOptions<T,C> {
    clientProvider: ClientProvider<T, C>;
    rateLimitedProvider: RateLimiterProvider
}