import { Scanner } from "./scanner";

export class FetchedDataProcessor {
    constructor(private readonly scanner: InstanceType<typeof Scanner>) {
        
    }

    public async process() {
        throw new Error('Not implemented');
    }
}