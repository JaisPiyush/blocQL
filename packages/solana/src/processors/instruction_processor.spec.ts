import {expect} from 'chai'

import { SolanaTransactionModel } from "types/src/models/solana/transaction";
import { SolanaInstructionsProcessor } from './instruction_processor';
import { SolanaProcessorProvider } from './processor';
import { solanaServiceProvider } from '../scanner';
import * as web3 from '@solana/web3.js'
import { ConsoleDataBroadcaster } from 'scanner/src/broadcaster/console_data_broadcaster';
import { nullDataStoreProvider } from 'types';

const instructions = [
    {
        parsed: {
            info: {
                extensionTypes: ['immutableOwner'],
                mint: 'd9qWjT3J7voZnK8Utcj3eN2WjfH739KqSJeL9Qvw2CA',
            },
            type: 'getAccountDataSize',
        },
        program: 'spl-token',
        programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        stackHeight: null,
    },
    {
        accounts: ['65MjuX2uqTLLovtAb77LWF3rPJYCy9hEETQT85ns2Ynm'],
        data: '11111111111111111111111111111111',
        programId: 'DeJBGdMFa1uynnnKiwrVioatTuHmNLpyFKnmB5kaFdzQ',
        stackHeight: null,
    },
    {
        accounts: [
            'DZxZjKUMauVkyGKjUUdxatjiJAKQpgMHj6bgPoAvGGt6',
            'ebHyEapefjFpwF3MrzzHHeAywf5ASpBhAfCzyUXK2sk',
            'Dy35n3R1dNiHFirQ4SHt8QRJTPWXCPzQvRZFyJxyqiT4',
            '65MjuX2uqTLLovtAb77LWF3rPJYCy9hEETQT85ns2Ynm',
            'd9qWjT3J7voZnK8Utcj3eN2WjfH739KqSJeL9Qvw2CA',
            '7FxShdpLZpAHHDmXK84kxek5Z2QnPUuzFbikEVtdQXpT',
            'GTR155yeex6c2pPEHaa2hFFUiv1ocLLN6YsmUQnHU86k',
            'JBpX4SsdVkyFwnHLnio4Fk1EGZd5PNqJiVdntPLAHzi',
            '5zjTmGyzQta94X2EZT6qH9JpYQC2uqYrMjiqxCXcSjBP',
            'ebHyEapefjFpwF3MrzzHHeAywf5ASpBhAfCzyUXK2sk',
            'ebHyEapefjFpwF3MrzzHHeAywf5ASpBhAfCzyUXK2sk',
            '11111111111111111111111111111111',
            'Sysvar1nstructions1111111111111111111111111',
            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
            'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
            'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg',
            'Ft2CzsbEF3iFeviKvtQHCrbq9avps3u7351YhUVzZpbx',
        ],
        data: 'D9kCuD4PTuQuyCK',
        programId: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
        stackHeight: null,
    },
];


const txn: SolanaTransactionModel = {
    signature: 'txn-signature',
    slot: 123,
    tx_index: 0,
    signer: 'txn-signer',
    success: true,
    block_time: new Date(),
    block_date: new Date(),
    fee: 123,
    post_balances: [1, 2, 3],
    pre_balances: [1, 2, 3],
    account_keys: ['1', '2', '3'],
    instructions: ['1', '2', '3'],
    signatures: ['1', '2', '3'],
    block_hash: 'block-hash',
    required_signatures: 1,
    recent_block_hash: 'recent-block-hash',
}

describe('instruction_processor', function () {
    this.timeout(5000);
    const solanaTestConfigProvider = () => ({
        endpoint: web3.clusterApiUrl('mainnet-beta'),
        maxRequestPerSecond: 10,
        defaultStartBlockHeight: 218827117,
    });
    const _solanaServiceProvider = solanaServiceProvider(solanaTestConfigProvider);
    const providers: SolanaProcessorProvider = {
        serviceProvider: _solanaServiceProvider,
        dataBroadcasterProvider: async () => new ConsoleDataBroadcaster(),
        datastoreProvider: nullDataStoreProvider,
    }
    const processor = new SolanaInstructionsProcessor(providers);

    before(async () => {
        const programIds = instructions.map((ins) => ins.programId);
        await processor.__preSetupIdlCoders(programIds)
    });
    it('should be able to process fully parsed instruction', () => {
        const instruction = processor.__getInstructionModel({
            instruction: {
                program: instructions[0].program,
                programId: new web3.PublicKey(instructions[0].programId),
                parsed: instructions[0].parsed,
            }as web3.ParsedInstruction,
            index: 0,
            isInner: true,
            mainProgramId: instructions[0].programId,
            txn,
            innerInstructionIndex: 3, // Add innerInstructionIndex property with a default value of null
        });
        expect(instruction).to.deep.equal({
            tx_id: txn.signature,
            block_hash: txn.block_hash,
            block_slot: txn.slot,
            block_time: txn.block_time,
            tx_signer: txn.signer,
            tx_success: txn.success,
            inner_instruction_index: 3,
            instruction_index: 0,
            is_inner: true,
            program_id: instructions[0].programId,
            accounts: [],
            main_program_id: instructions[0].programId,
            inner_instructions: [],
            instruction_name: 'getAccountDataSize',
            id: `${txn.signature}.0.3`,
            data: {
                extensionTypes: ['immutableOwner'],
                mint: 'd9qWjT3J7voZnK8Utcj3eN2WjfH739KqSJeL9Qvw2CA',
            },
            program: 'spl-token',
        });
    });

    it('should be able to process partially decoded instruction with unknown program', () => {
        const instruction = processor.__getInstructionModel({
            instruction: {
                programId: new web3.PublicKey(instructions[1].programId),
                data: instructions[1].data,
                accounts: instructions[1].accounts!.map((acc) => new web3.PublicKey(acc)),
            } as web3.PartiallyDecodedInstruction,
            index: 0,
            isInner: false,
            mainProgramId: instructions[1].programId,
            txn,
            innerInstructionIndex: null, // Add innerInstructionIndex property with a default value of null
        });
        expect(instruction).to.deep.equal({
            tx_id: txn.signature,
            block_hash: txn.block_hash,
            block_slot: txn.slot,
            block_time: txn.block_time,
            tx_signer: txn.signer,
            tx_success: txn.success,
            inner_instruction_index: null,
            instruction_index: 0,
            is_inner: false,
            program_id: instructions[1].programId,
            accounts: [
                '65MjuX2uqTLLovtAb77LWF3rPJYCy9hEETQT85ns2Ynm',
            ],
            main_program_id: instructions[1].programId,
            inner_instructions: [],
            instruction_name: 'unknown',
            id: `${txn.signature}.0`,
            data: null,
            program: null,
            raw_data: instructions[1].data,
    })
    });

    it('should be able to process partially decoded instruction with known program', () => {
        const instruction = processor.__getInstructionModel({
            instruction: {
                programId: new web3.PublicKey(instructions[2].programId),
                data: instructions[2].data,
                accounts: instructions[2].accounts!.map((acc) => new web3.PublicKey(acc)),
            } as web3.PartiallyDecodedInstruction,
            index: 0,
            isInner: false,
            mainProgramId: instructions[2].programId,
            txn,
            innerInstructionIndex: null,
        });
        expect(instruction).to.deep.equal({
            tx_id: txn.signature,
            block_hash: txn.block_hash,
            block_slot: txn.slot,
            block_time: txn.block_time,
            tx_signer: txn.signer,
            tx_success: txn.success,
            inner_instruction_index: null,
            instruction_index: 0,
            is_inner: false,
            program_id: instructions[2].programId,
            accounts: instructions[2].accounts,
            main_program_id: instructions[2].programId,
            inner_instructions: [],
            instruction_name: 'transferV1',
            id: `${txn.signature}.0`,
            data: {
                amount: '1',
                authorizationData: null
            },
            program: null,
            raw_data: instructions[2].data,
    });
    });
});

