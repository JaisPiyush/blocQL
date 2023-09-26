export interface SolanaTokenMetadataModel {
    address: string;
    model: string;
    update_authority_address: string;
    json: any | null;
    json_loaded: boolean;
    name: string;
    symbol: string;
    uri: string;
    is_mutable: boolean;
    primary_sale_happened: boolean;
    seller_fee_basis_points: number;
    edition_nonce: number | null;
    creators: {
        address: string;
        verified: boolean;
        share: number;
    }[];
    token_standard: number | null;
    collection: {
        verified: boolean;
        address: string;
    } | null;
    collection_details: any | null;
    programmable_config: {
        __kind: string;
        rule_set?: string;
    } | null;
    metadata_address?: string;
    freeze_authority_address?: string;
    supply: {
        basis_points: number;
        currency: {
            symbol: string;
            decimals: number;
            namespace: string;
        };
    } | null;
    is_wrapped_sol: boolean;
    decimals: number;
    edition: {
        model: string;
        is_original: boolean;
        address: string;
        supply: number;
        max_supply: number;
    } | null;
    image?: string | null;
    description?: string | null;
    attributes?:
        | { value?: string; trait_type?: string; [key: string]: unknown }[]
        | null;
}
