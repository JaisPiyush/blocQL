import { Serializer } from '@metaplex-foundation/umi/serializers';
import { BaseIdlDecoder } from '../base';

import {
    getApproveCollectionAuthorityInstructionDataSerializer,
    getTransferV1InstructionDataSerializer,
} from './src/generated';
import { getApproveUseAuthorityInstructionDataSerializer } from './src/generated/instructions/approveUseAuthority';
import { getBubblegumSetCollectionSizeInstructionDataSerializer } from './src/generated/instructions/bubblegumSetCollectionSize';
import { getBurnEditionNftInstructionDataSerializer } from './src/generated/instructions/burnEditionNft';
import { getBurnNftInstructionDataSerializer } from './src/generated/instructions/burnNft';
import { getBurnV1InstructionDataSerializer } from './src/generated/instructions/burnV1';
import { getCloseEscrowAccountInstructionDataSerializer } from './src/generated/instructions/closeEscrowAccount';
import { getCollectInstructionDataSerializer } from './src/generated/instructions/collect';
import { getConvertMasterEditionV1ToV2InstructionDataSerializer } from './src/generated/instructions/convertMasterEditionV1ToV2';
import { getCreateEscrowAccountInstructionDataSerializer } from './src/generated/instructions/createEscrowAccount';
import { getCreateMasterEditionV3InstructionDataSerializer } from './src/generated/instructions/createMasterEditionV3';
import { getCreateMetadataAccountV3InstructionDataSerializer } from './src/generated/instructions/createMetadataAccountV3';
import { getCreateV1InstructionDataSerializer } from './src/generated/instructions/createV1';
import { getDelegateAuthorityItemV1InstructionDataSerializer } from './src/generated/instructions/delegateAuthorityItemV1';

export class MplTokenMetadataIdlDecoder extends BaseIdlDecoder {
    // Analyze all the files in generated/instructions and fill this map with discriminator as key and serializer function as value

    private readonly instructions: Record<number, Serializer<any, any> | Record<number, Serializer<any, any>>> = {
        23: getApproveCollectionAuthorityInstructionDataSerializer(),
        44: {
            9: getDelegateAuthorityItemV1InstructionDataSerializer()
        }
    }


    decode(data: string, encoding: string | number = 0) {
        const buffer = this.bs58ToBuffer(data);
        const discriminator = buffer[0];
        const serializer_or_map = this.instructions[discriminator];
        if (!serializer_or_map) {
            throw new Error(
                `Unknown instruction discriminator: ${discriminator}`
            );
        }
        let serializer: Serializer
        if (serializer_or_map.deserialize === undefined) {
            const deepDiscriminator = buffer[1];
            if (!serializer_or_map[deepDiscriminator]) {
                throw new Error(
                    `Unknown instruction discriminator: ${discriminator} ${deepDiscriminator}`
                );
            }
            serializer = serializer_or_map[deepDiscriminator]
        } else {
            serializer = serializer_or_map
        }
        const decoded = serializer.deserialize(buffer, 0)[0];
        return {
            name: this.__getSerializerName(serializer.description),
            args: this.__argParser(decoded),
        }
        
    }
}
