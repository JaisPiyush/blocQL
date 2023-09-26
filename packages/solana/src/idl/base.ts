import * as bs58 from 'bs58'
import { SolanaInstructionProcessorDecodedData } from 'types';

export class BaseIdlDecoder {
    decode(data: string, encoding : string | number= 'base58'): SolanaInstructionProcessorDecodedData | null {
        throw new Error('Method not implemented.');
    }

    public bs58ToBuffer(data: string) {
        return bs58.decode(data);
    }
}