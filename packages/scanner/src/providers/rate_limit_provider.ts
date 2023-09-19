import { RateLimiterProvider } from 'types/src/providers/rate_limited_provider'
import { TicketThrottler } from '../helpers/ticket-throttler'
import { ConfigProvider } from 'types/src/providers/config_provider'


let _flowRateLimiter: TicketThrottler | undefined = undefined

export const rateLimiterProvider = <T>(configProvider: ConfigProvider<T>): RateLimiterProvider => () => {
  if (!_flowRateLimiter) {
    _flowRateLimiter = new TicketThrottler(configProvider().maxRequestPerSecond, configProvider().maxRequestPerSecond)
  }

  return _flowRateLimiter
}