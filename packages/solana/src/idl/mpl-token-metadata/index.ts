import { Serializer } from '@metaplex-foundation/umi/serializers';
import { BaseIdlDecoder } from '../base';

import {
    getApproveCollectionAuthorityInstructionDataSerializer,
    getTransferV1InstructionDataSerializer,
} from './src/generated';

export class MplTokenMetadataIdlDecoder extends BaseIdlDecoder {
    // Analyze all the files in generated/instructions and fill this map with discriminator as key and serializer function as value

    private readonly instructions = new Map<number, Serializer<any, any>>([
        [
            23,
            getApproveCollectionAuthorityInstructionDataSerializer(),
        ],
        [49, getTransferV1InstructionDataSerializer()],
    ]);


    decode(data: string, encoding: string | number = 0) {
        const buffer = this.bs58ToBuffer(data);
        const discriminator = buffer[0];
        const serializer = this.instructions.get(discriminator);
        if (!serializer) {
            throw new Error(
                `Unknown instruction discriminator: ${discriminator}`
            );
        }
        const decoded = serializer.deserialize(buffer, 0)[0];
        return {
            name: this.__getSerializerName(serializer.description),
            args: this.__argParser(decoded),
        }
        
    }
}
