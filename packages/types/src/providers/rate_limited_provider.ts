import { TicketThrottlerInterface } from "../ticket_throttler";

export type RateLimiterProvider = () => TicketThrottlerInterface;