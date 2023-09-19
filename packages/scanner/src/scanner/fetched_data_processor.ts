import { ServiceProvider } from "types";
import { BlockchainScanner } from "./blockchain_scanner";
import { Scanner } from "./scanner";

export class FetchedDataProcessor<B extends BlockchainScanner,
    T extends Scanner<ServiceProvider, B> = Scanner<ServiceProvider, B>> {

    public async process(scanner: T) {
        throw new Error('Not implemented');
    }
}