import { BaseIdlDecoder } from "../base";
import { getApproveCollectionAuthorityInstructionDataSerializer, getTransferV1InstructionDataSerializer } from "./src/generated";

export class MplTokenMetadataIdlDecoder extends BaseIdlDecoder  {
    // Analyze all the files in generated/instructions and fill this map with discriminator as key and serializer function as value

    private readonly instructions: Map<number, (data: Buffer, offset?: number) => any> = new Map([
        [23, getApproveCollectionAuthorityInstructionDataSerializer().deserialize],
        [49, getTransferV1InstructionDataSerializer().deserialize]

    ]);
    // TODO: remove discriminator and replace { __option: 'None' } with null and return [0] element only
    decode(data: string, encoding : string | number = 'base58') {
        const buffer = this.bs58ToBuffer(data);
        const discriminator = buffer[0];
        const instruction = this.instructions.get(discriminator);
        if (!instruction) {
            throw new Error(`Unknown instruction discriminator: ${discriminator}`);
        }
        return instruction(Buffer.from(buffer), 0)[0];
        
    }
}