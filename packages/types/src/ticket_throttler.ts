export interface TicketThrottlerInterface {
    getMaxTickets(): number;
    getDecayPerSecond(): number;
    setDecayPerSecond(decayPerSecond: number): void;
    setMaxTickets(maxTickets: number): void;
    waitForTickets(count: number, maxWaitMs?: number): Promise<void>;
    reserveTickets(count: number, force: boolean): boolean;
    freeTickets(count: number): void;
}