import { SQSMessage } from 'scanner';
import { SolanaProcessor, SolanaProcessorProvider } from './processor';
import { BroadcastData, SolanaDatastoreName } from '../types';
import {
    Metaplex,
    Nft,
    NftOriginalEdition,
    NftWithToken,
    Sft,
    SftWithToken,
} from '@metaplex-foundation/js';
import { PublicKey } from '@solana/web3.js';
import { SolanaTokenMetadataModel } from 'types/src/models/solana/token_metadata';
import { LoggerInterface } from 'types';
export class SolanaTokenMetadataProcessor extends SolanaProcessor<string[]> {
    private async getNFT(
        metaplex: Metaplex,
        address: string,
        logger: LoggerInterface
    ) {
        try {
            return metaplex
                .nfts()
                .findByMint({ mintAddress: new PublicKey(address) });
        } catch (e) {
            logger.error(
                `Error fetching metadata for address ${address}: ${e}`
            );
            return null;
        }
    }

    public async __process(data: BroadcastData<string[]>) {
        const logger = this.providers.logProvider();
        try {
            const serviceProvider = await this.providers.serviceProvider();
            const datastore = await this.providers.datastoreProvider(
                SolanaDatastoreName.TokenDatastore
            );

            const metaplex = Metaplex.make(serviceProvider.connection);

            const tokenPromises = data.payload.map(async (address) => {
                const metadata = await this.getNFT(metaplex, address, logger);
                if (metadata) {
                    return this.getTokenMetadataModel(metadata);
                }
                return null;
            });

            logger.info('Started fetching token metadatas');
            const tokens = (await Promise.all(tokenPromises)).filter(
                (token) => token !== null
            ) as SolanaTokenMetadataModel[];

            await datastore.batchInsert(tokens);
            logger.info(
                `Finished fetching token metadatas and stored ${tokens.length} in database`
            );
        } catch (err) {
            logger.error(`SolanaTokenMetadataProcessor error: ${err}`);
        }
    }

    private getTokenMetadataModel(
        data: Sft | SftWithToken | Nft | NftWithToken
    ): SolanaTokenMetadataModel {
        const model: SolanaTokenMetadataModel = {
            model: data.model,
            address: data.address.toString(),
            update_authority_address: data.updateAuthorityAddress.toString(),
            json: data.json,
            json_loaded: data.jsonLoaded,
            name: data.json && data.json.name ? data.json.name : data.name,
            symbol: data.symbol,
            uri: data.uri,
            is_mutable: data.isMutable,
            primary_sale_happened: data.primarySaleHappened,
            seller_fee_basis_points: data.sellerFeeBasisPoints,
            edition_nonce: data.editionNonce,
            token_standard: data.tokenStandard,
            collection: data.collection
                ? {
                      address: data.collection.address.toString(),
                      verified: data.collection.verified,
                  }
                : null,
            collection_details: data.collectionDetails
                ? {
                      ...data.collectionDetails,
                      size: data.collectionDetails.size.toString(),
                  }
                : null,
            programmable_config: data.programmableConfig
                ? {
                      __kind: data.programmableConfig.__kind,
                      rule_set: data.programmableConfig.ruleSet?.toString(),
                  }
                : null,
            creators: !data.creators
                ? []
                : data.creators.map((creator) => ({
                      address: creator.address.toString(),
                      verified: creator.verified,
                      share: creator.share,
                  })),
            freeze_authority_address:
                data.mint.freezeAuthorityAddress?.toString(),
            decimals: data.mint.decimals,
            supply: {
                basis_points: data.mint.supply.basisPoints.toString(),
                currency: {
                    symbol: data.mint.supply.currency.symbol,
                    decimals: data.mint.supply.currency.decimals,
                    namespace: data.mint.supply.currency.namespace,
                },
            },
            metadata_address: data.metadataAddress?.toString(),
            is_wrapped_sol: data.mint.isWrappedSol,
            edition: null,
            image: data.json ? data.json.image : null,
            description: data.json ? data.json.description : null,
            attributes: data.json ? data.json.attributes : null,
        };

        if ((data as Nft).edition) {
            let nft = data as Nft;
            model.edition = {
                model: nft.edition.model,
                is_original: nft.edition.isOriginal,
                address: nft.edition.address.toString(),
                supply: (nft.edition as NftOriginalEdition).supply
                    ? (nft.edition as NftOriginalEdition).supply.toString()
                    : null,
                max_supply: (nft.edition as NftOriginalEdition).maxSupply
                    ? (nft.edition as NftOriginalEdition).maxSupply.toString()
                    : 0,
            };
        }

        return model;
    }
}
