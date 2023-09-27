import { BaseIdlDecoder } from "../base";
import { TokenInstruction, initializeMintInstructionData } from "./src/index";
import { struct} from '@solana/buffer-layout';

export class SplTokenIdlDecoder
    extends BaseIdlDecoder {
        private readonly instructions: Record<number, {name: string, decoder: Function}> = {
            0: {
                name: 'initializeMint',
                decoder: initializeMintInstructionData
            },
        }

        decode(data: string, encoding?: string | number) {
            
        }
    }