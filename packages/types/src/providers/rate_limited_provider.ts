import { TicketThrottler } from "../ticket_throttler";

export type RateLimiterProvider = () => TicketThrottler;