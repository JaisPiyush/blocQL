import {
    BroadcastData,
    SolanaDatBroadcastType,
    SolanaDatastoreName,
    SolanaInstructionDecoderFn,
    SolanaInstructionsMessage,
} from '../types';
import { SolanaProcessor, SolanaProcessorProvider } from './processor';
import { Provider, Program, web3, BN } from '@project-serum/anchor';
import { BorshCoder } from '@coral-xyz/anchor';
import { SolanaTransactionModel } from 'types/src/models/solana/transaction';
import {
    ParsedInstruction,
    PartiallyDecodedInstruction,
} from '@solana/web3.js';
import { SolanaInstructionCallModel } from 'types/src/models/solana/instruction_call';
import { BaseIdlDecoder } from '../idl/base';
import { SolanaInstructionProcessorDecodedData } from 'types';
import { MplTokenMetadataIdlDecoder } from '../idl/mpl-token-metadata';
import { SolanaTokenMetadataProcessor } from './token_processor';

export class SolanaInstructionsProcessor extends SolanaProcessor<SolanaInstructionsMessage> {
    private __offlineIdlDecoders = new Map<string, typeof BaseIdlDecoder>([
        [
            'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
            MplTokenMetadataIdlDecoder,
        ],
    ]);

    private idlDecoders = new Map<string, SolanaInstructionDecoderFn>([]);

    private readonly tokenMetadataProcessor: SolanaTokenMetadataProcessor;

    constructor(providers: SolanaProcessorProvider) {
        super(providers);
        this.tokenMetadataProcessor = new SolanaTokenMetadataProcessor(
            providers
        );
    }

    public _getInstructionId(
        txnId: string,
        index: number,
        innerIndex?: number
    ): string {
        if (innerIndex) {
            return `${txnId}.${index}.${innerIndex}`;
        }
        return `${txnId}.${index}`;
    }

    private async getIdl(programId: string, provider: Provider) {
        return await Program.fetchIdl(programId, provider);
    }

    private getCoder(idl: any) {
        return new BorshCoder(idl);
    }

    private decode(
        programId: string,
        data: string,
        encode = 'base58'
    ): SolanaInstructionProcessorDecodedData | null {
        if (this.idlDecoders.has(programId)) {
            const decoded = this.idlDecoders.get(programId)!(data, encode);
            if (!decoded) {
                return null;
            }
            return {
                name: decoded.name,
                args: decoded.args
                    ? this.__argParser(decoded.args)
                    : decoded.args,
            };
        }
        return {
            name: 'unknown',
            args: null,
        };
    }

    public __getInstructionModel = this.getInstructionModel;

    private __argParser(data: Record<string, any>): any {
        for (const [key, value] of Object.entries(data)) {
            if (
                typeof value === 'bigint' ||
                value instanceof BN ||
                value instanceof web3.PublicKey
            ) {
                data[key] = value.toString();
            }
        }

        return data;
    }

    private getInstructionModel({
        innerInstructionIndex = null,
        ...data
    }: {
        instruction: ParsedInstruction | PartiallyDecodedInstruction;
        index: number;
        isInner: boolean;
        innerInstructionIndex: number | null;
        txn: SolanaTransactionModel;
        mainProgramId?: string;
    }): [SolanaInstructionCallModel, string[]] {
        const tokens: string[] = [];
        const partialCallData: Omit<
            SolanaInstructionCallModel,
            'data' | 'program' | 'raw_data'
        > = {
            tx_id: data.txn.signature,
            block_hash: data.txn.block_hash,
            block_slot: data.txn.slot,
            block_time: data.txn.block_time,
            tx_signer: data.txn.signer,
            tx_success: data.txn.success,
            inner_instruction_index: innerInstructionIndex,
            instruction_index: data.index,
            is_inner: data.isInner,
            program_id: data.instruction.programId.toString(),
            accounts: [],
            main_program_id: data.isInner
                ? (data.mainProgramId as string)
                : data.instruction.programId.toString(),
            inner_instructions: [],
            instruction_name: 'unknown',
            id: data.isInner
                ? this._getInstructionId(
                      data.txn.signature,
                      data.index,
                      innerInstructionIndex as number
                  )
                : this._getInstructionId(data.txn.signature, data.index),
        };

        if ((data.instruction as ParsedInstruction).parsed) {
            const ins = data.instruction as ParsedInstruction;
            if (ins.parsed.info.mint) {
                tokens.push(ins.parsed.info.mint);
            }
            return [
                {
                    ...partialCallData,
                    data: ins.parsed.info,
                    program: ins.program,
                    instruction_name: ins.parsed.type,
                },
                tokens,
            ];
        }
        const ins = data.instruction as PartiallyDecodedInstruction;
        const decoded = this.decode(ins.programId.toString(), ins.data);
        if (decoded) {
            if (decoded.args && decoded.args.mint) {
                tokens.push(decoded.args.mint);
            }
            return [
                {
                    ...partialCallData,
                    data: decoded.args,
                    program: null,
                    raw_data: ins.data,
                    instruction_name: decoded.name,
                    accounts: ins.accounts.map((acc) => acc.toString()),
                },
                tokens,
            ];
        }
        return [
            {
                ...partialCallData,
                data: null,
                program: null,
                raw_data: ins.data,
                accounts: ins.accounts.map((acc) => acc.toString()),
            },
            tokens,
        ];
    }

    public async __preSetupIdlCoders(programIds: string[]) {
        const serviceProvider = await this.providers.serviceProvider();
        const provider = { connection: serviceProvider.connection };

        for (const programId of programIds) {
            if (this.idlDecoders.has(programId)) {
                continue;
            }
            if (this.__offlineIdlDecoders.has(programId)) {
                this.idlDecoders.set(programId, (data, encode) => {
                    const decoder = new (this.__offlineIdlDecoders.get(
                        programId
                    )!)();
                    return decoder.decode(data, encode);
                });
                continue;
            }
            const idl = await this.getIdl(programId, provider);
            if (idl !== null) {
                const coder = this.getCoder(idl);
                this.idlDecoders.set(programId, (data, encode) => {
                    const decoded = coder.instruction.decode(data, encode);
                    if (!decoded) {
                        return null;
                    }
                    return {
                        name: decoded.name,
                        args: (decoded.data as any).args,
                    };
                });
            }
        }
    }

    public async __process(
        data: BroadcastData<SolanaInstructionsMessage>
    ): Promise<void> {
        const logger = this.providers.logProvider();
        try {
            const instructionDatastore = await this.providers.datastoreProvider(
                SolanaDatastoreName.InstructionDatastore
            );
            const tokenDatastore = await this.providers.datastoreProvider(
                SolanaDatastoreName.TokenDatastore
            );

            const programIds =
                data.payload.rawTxn.transaction.message.instructions.map(
                    (ins) => ins.programId.toString()
                );
            logger.info(`Preparing Idl decoders for programs`);
            await this.__preSetupIdlCoders(programIds);

            const instructionCalls: SolanaInstructionCallModel[] = [];
            let tokens: string[] = [];
            for (const [
                index,
                instruction,
            ] of data.payload.rawTxn.transaction.message.instructions.entries()) {
                const [instructionModel, _tokens] = this.getInstructionModel({
                    instruction,
                    index,
                    isInner: false,
                    innerInstructionIndex: null,
                    txn: data.payload.txn,
                    mainProgramId: instruction.programId.toString(),
                });
                instructionCalls.push(instructionModel);
                tokens = [...tokens, ..._tokens];
            }
            if (data.payload.rawTxn.meta!.innerInstructions) {
                for (const innerInstructions of data.payload.rawTxn.meta!
                    .innerInstructions) {
                    for (const [
                        index,
                        instruction,
                    ] of innerInstructions.instructions.entries()) {
                        const [instructionModel, _tokens] =
                            this.getInstructionModel({
                                instruction,
                                index: innerInstructions.index,
                                isInner: true,
                                innerInstructionIndex: index,
                                txn: data.payload.txn,
                                mainProgramId:
                                    data.payload.rawTxn.transaction.message.instructions[
                                        innerInstructions.index
                                    ].programId.toString(),
                            });
                        instructionCalls.push(instructionModel);
                        tokens = [...tokens, ..._tokens];
                    }
                }
            }

            await instructionDatastore.batchInsert(instructionCalls);
            logger.info(
                `Inserted ${instructionCalls.length} instructions for transaction ${data.payload.txn.signature} into datastore`
            );
            // Clear the decoders
            this.idlDecoders.clear();

            await this.tokenMetadataProcessor.__process({
                target: SolanaDatBroadcastType.TokenBroadcast,
                payload: tokens,
            });
        } catch (err) {
            logger.error(`SolanaInstructionsProcessor error: ${err}`);
        }
    }

    private async __processTokenMetadata(tokens: string[]) {
        //TODO: Fetch and store token metadata
    }
}
