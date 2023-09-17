import { ServiceProvider } from "types";

export class MockClient extends ServiceProvider  {
    constructor(
        private latestBlockHeight: number,

    ) {
        super();
    }

    async getLatestBlockHeight(): Promise<number> {
        return this.latestBlockHeight;
    }

    setLatestBlockHeight(height: number) {
        this.latestBlockHeight = height;
    }
}