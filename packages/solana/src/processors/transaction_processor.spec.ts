export const normalTxn = {
    blockTime: 1695164503,
    meta: {
        computeUnitsConsumed: 104536,
        err: null,
        fee: 6600,
        innerInstructions: [
            {
                index: 3,
                instructions: [
                    {
                        parsed: {
                            info: {
                                extensionTypes: ['immutableOwner'],
                                mint: 'd9qWjT3J7voZnK8Utcj3eN2WjfH739KqSJeL9Qvw2CA',
                            },
                            type: 'getAccountDataSize',
                        },
                        program: 'spl-token',
                        programId:
                            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                        stackHeight: null,
                    },
                    {
                        parsed: {
                            info: {
                                lamports: 2039280,
                                newAccount:
                                    'Dy35n3R1dNiHFirQ4SHt8QRJTPWXCPzQvRZFyJxyqiT4',
                                owner: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                                source: 'ebHyEapefjFpwF3MrzzHHeAywf5ASpBhAfCzyUXK2sk',
                                space: 165,
                            },
                            type: 'createAccount',
                        },
                        program: 'system',
                        programId: '11111111111111111111111111111111',
                        stackHeight: null,
                    },
                    {
                        parsed: {
                            info: {
                                account:
                                    'Dy35n3R1dNiHFirQ4SHt8QRJTPWXCPzQvRZFyJxyqiT4',
                            },
                            type: 'initializeImmutableOwner',
                        },
                        program: 'spl-token',
                        programId:
                            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                        stackHeight: null,
                    },
                    {
                        parsed: {
                            info: {
                                account:
                                    'Dy35n3R1dNiHFirQ4SHt8QRJTPWXCPzQvRZFyJxyqiT4',
                                mint: 'd9qWjT3J7voZnK8Utcj3eN2WjfH739KqSJeL9Qvw2CA',
                                owner: '65MjuX2uqTLLovtAb77LWF3rPJYCy9hEETQT85ns2Ynm',
                            },
                            type: 'initializeAccount3',
                        },
                        program: 'spl-token',
                        programId:
                            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                        stackHeight: null,
                    },
                ],
            },
            {
                index: 4,
                instructions: [
                    {
                        parsed: {
                            info: {
                                account:
                                    'DZxZjKUMauVkyGKjUUdxatjiJAKQpgMHj6bgPoAvGGt6',
                                freezeAuthority:
                                    'GTR155yeex6c2pPEHaa2hFFUiv1ocLLN6YsmUQnHU86k',
                                mint: 'd9qWjT3J7voZnK8Utcj3eN2WjfH739KqSJeL9Qvw2CA',
                            },
                            type: 'thawAccount',
                        },
                        program: 'spl-token',
                        programId:
                            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                        stackHeight: null,
                    },
                    {
                        parsed: {
                            info: {
                                amount: '1',
                                destination:
                                    'Dy35n3R1dNiHFirQ4SHt8QRJTPWXCPzQvRZFyJxyqiT4',
                                multisigAuthority:
                                    'ebHyEapefjFpwF3MrzzHHeAywf5ASpBhAfCzyUXK2sk',
                                signers: [
                                    'ebHyEapefjFpwF3MrzzHHeAywf5ASpBhAfCzyUXK2sk',
                                ],
                                source: 'DZxZjKUMauVkyGKjUUdxatjiJAKQpgMHj6bgPoAvGGt6',
                            },
                            type: 'transfer',
                        },
                        program: 'spl-token',
                        programId:
                            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                        stackHeight: null,
                    },
                    {
                        parsed: {
                            info: {
                                account:
                                    'Dy35n3R1dNiHFirQ4SHt8QRJTPWXCPzQvRZFyJxyqiT4',
                                freezeAuthority:
                                    'GTR155yeex6c2pPEHaa2hFFUiv1ocLLN6YsmUQnHU86k',
                                mint: 'd9qWjT3J7voZnK8Utcj3eN2WjfH739KqSJeL9Qvw2CA',
                            },
                            type: 'freezeAccount',
                        },
                        program: 'spl-token',
                        programId:
                            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                        stackHeight: null,
                    },
                    {
                        parsed: {
                            info: {
                                destination:
                                    '5zjTmGyzQta94X2EZT6qH9JpYQC2uqYrMjiqxCXcSjBP',
                                lamports: 1447680,
                                source: 'ebHyEapefjFpwF3MrzzHHeAywf5ASpBhAfCzyUXK2sk',
                            },
                            type: 'transfer',
                        },
                        program: 'system',
                        programId: '11111111111111111111111111111111',
                        stackHeight: null,
                    },
                    {
                        parsed: {
                            info: {
                                account:
                                    '5zjTmGyzQta94X2EZT6qH9JpYQC2uqYrMjiqxCXcSjBP',
                                space: 80,
                            },
                            type: 'allocate',
                        },
                        program: 'system',
                        programId: '11111111111111111111111111111111',
                        stackHeight: null,
                    },
                    {
                        parsed: {
                            info: {
                                account:
                                    '5zjTmGyzQta94X2EZT6qH9JpYQC2uqYrMjiqxCXcSjBP',
                                owner: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
                            },
                            type: 'assign',
                        },
                        program: 'system',
                        programId: '11111111111111111111111111111111',
                        stackHeight: null,
                    },
                ],
            },
        ],
        logMessages: [
            'Program ComputeBudget111111111111111111111111111111 invoke [1]',
            'Program ComputeBudget111111111111111111111111111111 success',
            'Program ComputeBudget111111111111111111111111111111 invoke [1]',
            'Program ComputeBudget111111111111111111111111111111 success',
            'Program DeJBGdMFa1uynnnKiwrVioatTuHmNLpyFKnmB5kaFdzQ invoke [1]',
            'Program DeJBGdMFa1uynnnKiwrVioatTuHmNLpyFKnmB5kaFdzQ consumed 578 of 200000 compute units',
            'Program DeJBGdMFa1uynnnKiwrVioatTuHmNLpyFKnmB5kaFdzQ success',
            'Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL invoke [1]',
            'Program log: Create',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
            'Program log: Instruction: GetAccountDataSize',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1622 of 192330 compute units',
            'Program return: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA pQAAAAAAAAA=',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
            'Program 11111111111111111111111111111111 invoke [2]',
            'Program 11111111111111111111111111111111 success',
            'Program log: Initialize the associated token account',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
            'Program log: Instruction: InitializeImmutableOwner',
            'Program log: Please upgrade to SPL Token 2022 for immutable owner support',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 1405 of 185840 compute units',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
            'Program log: Instruction: InitializeAccount3',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4241 of 181956 compute units',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
            'Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL consumed 22045 of 199422 compute units',
            'Program ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL success',
            'Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s invoke [1]',
            'Program log: IX: Transfer',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
            'Program log: Instruction: ThawAccount',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4267 of 137147 compute units',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
            'Program log: Instruction: Transfer',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4728 of 128486 compute units',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [2]',
            'Program log: Instruction: FreezeAccount',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4265 of 117858 compute units',
            'Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success',
            'Program log: Transfer 1447680 lamports to the new account',
            'Program 11111111111111111111111111111111 invoke [2]',
            'Program 11111111111111111111111111111111 success',
            'Program log: Allocate space for the account',
            'Program 11111111111111111111111111111111 invoke [2]',
            'Program 11111111111111111111111111111111 success',
            'Program log: Assign the account to the owning program',
            'Program 11111111111111111111111111111111 invoke [2]',
            'Program 11111111111111111111111111111111 success',
            'Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s consumed 81913 of 177377 compute units',
            'Program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s success',
        ],
        postBalances: [
            274276008, 1447680, 5616720, 2039280, 2039280, 0, 1, 27981719,
            731913600, 1141440, 1, 1461600, 1141440, 4482240, 2853600, 1141440,
            0, 1009200, 934087680,
        ],
        postTokenBalances: [
            {
                accountIndex: 3,
                mint: 'd9qWjT3J7voZnK8Utcj3eN2WjfH739KqSJeL9Qvw2CA',
                owner: '65MjuX2uqTLLovtAb77LWF3rPJYCy9hEETQT85ns2Ynm',
                programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                uiTokenAmount: {
                    amount: '1',
                    decimals: 0,
                    uiAmount: 1.0,
                    uiAmountString: '1',
                },
            },
            {
                accountIndex: 4,
                mint: 'd9qWjT3J7voZnK8Utcj3eN2WjfH739KqSJeL9Qvw2CA',
                owner: 'ebHyEapefjFpwF3MrzzHHeAywf5ASpBhAfCzyUXK2sk',
                programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                uiTokenAmount: {
                    amount: '0',
                    decimals: 0,
                    uiAmount: null,
                    uiAmountString: '0',
                },
            },
        ],
        preBalances: [
            276321888, 0, 5616720, 0, 2039280, 1447680, 1, 27981719, 731913600,
            1141440, 1, 1461600, 1141440, 4482240, 2853600, 1141440, 0, 1009200,
            934087680,
        ],
        preTokenBalances: [
            {
                accountIndex: 4,
                mint: 'd9qWjT3J7voZnK8Utcj3eN2WjfH739KqSJeL9Qvw2CA',
                owner: 'ebHyEapefjFpwF3MrzzHHeAywf5ASpBhAfCzyUXK2sk',
                programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                uiTokenAmount: {
                    amount: '1',
                    decimals: 0,
                    uiAmount: 1.0,
                    uiAmountString: '1',
                },
            },
        ],
        rewards: [],
        status: {
            Ok: null,
        },
    },
    slot: 218586926,
    transaction: {
        message: {
            accountKeys: [
                {
                    pubkey: 'ebHyEapefjFpwF3MrzzHHeAywf5ASpBhAfCzyUXK2sk',
                    signer: true,
                    source: 'transaction',
                    writable: true,
                },
                {
                    pubkey: '5zjTmGyzQta94X2EZT6qH9JpYQC2uqYrMjiqxCXcSjBP',
                    signer: false,
                    source: 'transaction',
                    writable: true,
                },
                {
                    pubkey: '7FxShdpLZpAHHDmXK84kxek5Z2QnPUuzFbikEVtdQXpT',
                    signer: false,
                    source: 'transaction',
                    writable: true,
                },
                {
                    pubkey: 'Dy35n3R1dNiHFirQ4SHt8QRJTPWXCPzQvRZFyJxyqiT4',
                    signer: false,
                    source: 'transaction',
                    writable: true,
                },
                {
                    pubkey: 'DZxZjKUMauVkyGKjUUdxatjiJAKQpgMHj6bgPoAvGGt6',
                    signer: false,
                    source: 'transaction',
                    writable: true,
                },
                {
                    pubkey: 'JBpX4SsdVkyFwnHLnio4Fk1EGZd5PNqJiVdntPLAHzi',
                    signer: false,
                    source: 'transaction',
                    writable: true,
                },
                {
                    pubkey: '11111111111111111111111111111111',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
                {
                    pubkey: '65MjuX2uqTLLovtAb77LWF3rPJYCy9hEETQT85ns2Ynm',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
                {
                    pubkey: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
                {
                    pubkey: 'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
                {
                    pubkey: 'ComputeBudget111111111111111111111111111111',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
                {
                    pubkey: 'd9qWjT3J7voZnK8Utcj3eN2WjfH739KqSJeL9Qvw2CA',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
                {
                    pubkey: 'DeJBGdMFa1uynnnKiwrVioatTuHmNLpyFKnmB5kaFdzQ',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
                {
                    pubkey: 'Ft2CzsbEF3iFeviKvtQHCrbq9avps3u7351YhUVzZpbx',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
                {
                    pubkey: 'GTR155yeex6c2pPEHaa2hFFUiv1ocLLN6YsmUQnHU86k',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
                {
                    pubkey: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
                {
                    pubkey: 'Sysvar1nstructions1111111111111111111111111',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
                {
                    pubkey: 'SysvarRent111111111111111111111111111111111',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
                {
                    pubkey: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
            ],
            instructions: [
                {
                    accounts: [],
                    data: '3QBcnUb9zKM9',
                    programId: 'ComputeBudget111111111111111111111111111111',
                    stackHeight: null,
                },
                {
                    accounts: [],
                    data: 'Fj2Eoy',
                    programId: 'ComputeBudget111111111111111111111111111111',
                    stackHeight: null,
                },
                {
                    accounts: ['65MjuX2uqTLLovtAb77LWF3rPJYCy9hEETQT85ns2Ynm'],
                    data: '11111111111111111111111111111111',
                    programId: 'DeJBGdMFa1uynnnKiwrVioatTuHmNLpyFKnmB5kaFdzQ',
                    stackHeight: null,
                },
                {
                    parsed: {
                        info: {
                            account:
                                'Dy35n3R1dNiHFirQ4SHt8QRJTPWXCPzQvRZFyJxyqiT4',
                            mint: 'd9qWjT3J7voZnK8Utcj3eN2WjfH739KqSJeL9Qvw2CA',
                            source: 'ebHyEapefjFpwF3MrzzHHeAywf5ASpBhAfCzyUXK2sk',
                            systemProgram: '11111111111111111111111111111111',
                            tokenProgram:
                                'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
                            wallet: '65MjuX2uqTLLovtAb77LWF3rPJYCy9hEETQT85ns2Ynm',
                        },
                        type: 'create',
                    },
                    program: 'spl-associated-token-account',
                    programId: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
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
            ],
            recentBlockhash: '5rAqcjkEvcL8X659sPqFCE1pvCu1WA7N5kxh84EKEsiw',
        },
        signatures: [
            '43rCYRAJF2ntdqNk5enMNpgFVUJueLnfC8MuMULQF8rhB5PLXzhm3LcXBydjDnPAL7P3buqjNYa77bVAFgc2rTcV',
        ],
    },
    version: 'legacy',
};
export const voteTxn = {
    blockTime: 1695383926,
    meta: {
        computeUnitsConsumed: 0,
        err: null,
        fee: 5000,
        innerInstructions: [],
        logMessages: [
            'Program Vote111111111111111111111111111111111111111 invoke [1]',
            'Program Vote111111111111111111111111111111111111111 success',
        ],
        postBalances: [4427608512, 16012466144, 1],
        postTokenBalances: [],
        preBalances: [4427613512, 16012466144, 1],
        preTokenBalances: [],
        rewards: [],
        status: {
            Ok: null,
        },
    },
    slot: 219088169,
    transaction: {
        message: {
            accountKeys: [
                {
                    pubkey: '6ww6gHBqJcGJ8aWB3Lp7oj23sqda5HgCkMxktDS7Sqqe',
                    signer: true,
                    source: 'transaction',
                    writable: true,
                },
                {
                    pubkey: '8uCsxn1eLY4jC7FEJK9gnBhtMafVziDtVKtuisLJFD7t',
                    signer: false,
                    source: 'transaction',
                    writable: true,
                },
                {
                    pubkey: 'Vote111111111111111111111111111111111111111',
                    signer: false,
                    source: 'transaction',
                    writable: false,
                },
            ],
            instructions: [
                {
                    parsed: {
                        info: {
                            voteAccount:
                                '8uCsxn1eLY4jC7FEJK9gnBhtMafVziDtVKtuisLJFD7t',
                            voteAuthority:
                                '6ww6gHBqJcGJ8aWB3Lp7oj23sqda5HgCkMxktDS7Sqqe',
                            voteStateUpdate: {
                                hash: 'B1BdMgbFywhotEaW4HmhghncTca1nu8Tp7YD9HqeqEzd',
                                lockouts: [
                                    {
                                        confirmation_count: 31,
                                        slot: 219088131,
                                    },
                                    {
                                        confirmation_count: 30,
                                        slot: 219088132,
                                    },
                                    {
                                        confirmation_count: 29,
                                        slot: 219088133,
                                    },
                                    {
                                        confirmation_count: 28,
                                        slot: 219088140,
                                    },
                                    {
                                        confirmation_count: 27,
                                        slot: 219088141,
                                    },
                                    {
                                        confirmation_count: 26,
                                        slot: 219088142,
                                    },
                                    {
                                        confirmation_count: 25,
                                        slot: 219088143,
                                    },
                                    {
                                        confirmation_count: 24,
                                        slot: 219088144,
                                    },
                                    {
                                        confirmation_count: 23,
                                        slot: 219088145,
                                    },
                                    {
                                        confirmation_count: 22,
                                        slot: 219088146,
                                    },
                                    {
                                        confirmation_count: 21,
                                        slot: 219088147,
                                    },
                                    {
                                        confirmation_count: 20,
                                        slot: 219088148,
                                    },
                                    {
                                        confirmation_count: 19,
                                        slot: 219088149,
                                    },
                                    {
                                        confirmation_count: 18,
                                        slot: 219088150,
                                    },
                                    {
                                        confirmation_count: 17,
                                        slot: 219088151,
                                    },
                                    {
                                        confirmation_count: 16,
                                        slot: 219088152,
                                    },
                                    {
                                        confirmation_count: 15,
                                        slot: 219088153,
                                    },
                                    {
                                        confirmation_count: 14,
                                        slot: 219088154,
                                    },
                                    {
                                        confirmation_count: 13,
                                        slot: 219088155,
                                    },
                                    {
                                        confirmation_count: 12,
                                        slot: 219088156,
                                    },
                                    {
                                        confirmation_count: 11,
                                        slot: 219088157,
                                    },
                                    {
                                        confirmation_count: 10,
                                        slot: 219088158,
                                    },
                                    {
                                        confirmation_count: 9,
                                        slot: 219088159,
                                    },
                                    {
                                        confirmation_count: 8,
                                        slot: 219088160,
                                    },
                                    {
                                        confirmation_count: 7,
                                        slot: 219088161,
                                    },
                                    {
                                        confirmation_count: 6,
                                        slot: 219088162,
                                    },
                                    {
                                        confirmation_count: 5,
                                        slot: 219088163,
                                    },
                                    {
                                        confirmation_count: 4,
                                        slot: 219088164,
                                    },
                                    {
                                        confirmation_count: 3,
                                        slot: 219088165,
                                    },
                                    {
                                        confirmation_count: 2,
                                        slot: 219088166,
                                    },
                                    {
                                        confirmation_count: 1,
                                        slot: 219088167,
                                    },
                                ],
                                root: 219088130,
                                timestamp: 1695383926,
                            },
                        },
                        type: 'compactupdatevotestate',
                    },
                    program: 'vote',
                    programId: 'Vote111111111111111111111111111111111111111',
                    stackHeight: null,
                },
            ],
            recentBlockhash: '3dvcQ1ESsqfjAqacRm7UN1TFW5LVUj84KZ4E8FNZ9FsD',
        },
        signatures: [
            '2nRtG7k61Yz23fxDZJxx93Hnt7afwWDWuBQfVAzexmFbZXtWgh2uZayrcCNp6L1nAW8hv1e5GCnnM9tVa37PQGvr',
        ],
    },
    version: 'legacy',
};
