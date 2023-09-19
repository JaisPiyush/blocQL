import { ProvidersOptions, SQSMessage } from "scanner";
import { SolanaServiceProvider } from "../scanner/providers/solana_service_provider";

export class SolanaProcessor {
    constructor(
        protected readonly providers: ProvidersOptions<SolanaServiceProvider>,
    ) {}
    public async process(message: SQSMessage) {
        throw new Error("Method not implemented.");
    }
}