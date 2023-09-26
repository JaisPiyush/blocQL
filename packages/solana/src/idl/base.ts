import * as bs58 from 'bs58';
import { SolanaInstructionProcessorDecodedData } from 'types';

export class BaseIdlDecoder {
    decode(
        data: string,
        encoding: string | number = 'base58'
    ): SolanaInstructionProcessorDecodedData | null {
        throw new Error('Method not implemented.');
    }

    protected __getSerializerName(name: string) {
        name = name[0].toLowerCase() + name.slice(1);
        name = name.replace('InstructionData', '');
        return name
    }

    protected __argParser(data: Record<string, any>): any {
        for (const [key, value] of Object.entries(data)) {
            if (value.__option === 'None') {
                data[key] = null;
            }
            if(key === 'discriminator' || key.includes('Discriminator')) {
                delete data[key];
            }
        }
        return data;
    }

    public bs58ToBuffer(data: string) {
        return bs58.decode(data);
    }
}
