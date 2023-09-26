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
        key: string;
        address: string;
    } | null;
    collection_details: any | null;
    programmable_config: {
        __kind: string;
        rule_set: string;
        address: string;
        metadata_address: string;
    } | null;
    metadata_address: string;
    mint_address: string;
    freeze_authority_address: string;
    supply: number;
    supply_basis_points: number;
    supply_currency: any;
    is_wrapped_sol: boolean;
    currency_symbol: string;
    currency_decimals: number;
    currency_namespace: string;
    edition: {
        model: string;
        is_original: boolean;
        address: string;
        supply: number;
        max_supply: number;
    } | null;
    image: string;
    description: string;
    attributes: {value: unknown, trait_type: string}[];
}