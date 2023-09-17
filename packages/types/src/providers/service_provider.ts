import { ClientProvider } from "./client_provider";
import { RateLimiterProvider } from "./rate_limited_provider";

export type ServiceProvider<S> = () => Promise<S>;

export interface ServiceProviderOptions<T,C> {
    clientProvider: ClientProvider<T, C>;
    rateLimitedProvider: RateLimiterProvider
}