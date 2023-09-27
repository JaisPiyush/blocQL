import { BaseIdlDecoder } from "../base";
import { TokenInstruction, amountToUiAmountInstructionData, approveCheckedInstructionData, approveInstructionData, burnCheckedInstructionData, burnInstructionData, closeAccountInstructionData, createNativeMintInstructionData, freezeAccountInstructionData, initializeAccount2InstructionData, initializeAccount3InstructionData, initializeAccountInstructionData, initializeImmutableOwnerInstructionData, initializeMint2InstructionData, initializeMintCloseAuthorityInstructionData, initializeMintInstructionData, initializeMultisigInstructionData, initializeNonTransferableMintInstructionData, initializePermanentDelegateInstructionData, mintToCheckedInstructionData, revokeInstructionData, setAuthorityInstructionData, syncNativeInstructionData, thawAccountInstructionData, transferCheckedInstructionData, transferInstructionData } from "./src/index";
import { struct} from '@solana/buffer-layout';

export class SplTokenIdlDecoder
    extends BaseIdlDecoder {
        private readonly instructions: Record<number, {name: string, decoder: Function}> = {
            0: {
                    name: 'initializeMint',
                    decoder: initializeMintInstructionData
               },
            23: {
                    name: 'amountToUiAmount',
                    decoder: amountToUiAmountInstructionData
                },
            4:  {
                    name: 'approve',
                    decoder: approveInstructionData
            },
            13: {
                    name: 'aprroveChecked',
                    decoder: approveCheckedInstructionData
            },
            8:  {
                    name: 'burn',
                    decoder: burnInstructionData
            },
            15: {
                    name: 'burnChecked',
                    decoder: burnCheckedInstructionData
            },
            9:  {
                    name: 'closeAccount',
                    decoder: closeAccountInstructionData
            },
            31: {
                    name: 'createNativeMint',
                    decoder: createNativeMintInstructionData
            },
            10: {
                    name: 'freezeAccount',
                    decoder: freezeAccountInstructionData
            },
            1:  {
                    name: 'initializeAccount',
                    decoder: initializeAccountInstructionData
            },
            16: {
                    name: 'initializeAccount2',
                    decoder: initializeAccount2InstructionData
            },
            18: {
                    name: 'initializeAccount3',
                    decoder: initializeAccount3InstructionData
            },
            22: {
                    name: 'initializeImmutableOwner',
                    decoder: initializeImmutableOwnerInstructionData
            },
            20: {
                    name: 'initializeMint2',
                    decoder: initializeMint2InstructionData
            },
            25: {
                    name: 'initializeMintCloseAuthority',
                    decoder: initializeMintCloseAuthorityInstructionData
            },
            2:  {
                    name: 'initializeMultisig',
                    decoder: initializeMultisigInstructionData
            },
            32: {
                    name: 'initializeNonTransferableMint',
                    decoder: initializeNonTransferableMintInstructionData
            },
            35: {
                    name: 'initializePermanentDelegate',
                    decoder: initializePermanentDelegateInstructionData
            },
            14: {
                    name: 'toCheckedMint',
                    decoder: mintToCheckedInstructionData
            },
            5:  {
                    name: 'revoke',
                    decoder: revokeInstructionData
            },
            6:  {
                    name: 'setAuthority',
                    decoder: setAuthorityInstructionData
            },
            17: {
                    name: 'syncNative',
                    decoder: syncNativeInstructionData
            },
            11: {
                    name: 'thawAccount',
                    decoder: thawAccountInstructionData
            },
            3:  {
                    name: 'transfer',
                    decoder: transferInstructionData
            },
            12: {
                    name: 'transferChecked',
                    decoder: transferCheckedInstructionData
            }, 

            
     }

        decode(data: string, encoding?: string | number) {
            
        }
    }