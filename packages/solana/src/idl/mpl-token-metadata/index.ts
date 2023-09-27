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
import { getDelegateCollectionItemV1InstructionDataSerializer } from './src/generated/instructions/delegateCollectionItemV1';
import { getDelegateCollectionV1InstructionDataSerializer } from './src/generated/instructions/delegateCollectionV1';
import { getDelegateDataItemV1InstructionDataSerializer } from './src/generated/instructions/delegateDataItemV1';
import { getDelegateDataV1InstructionDataSerializer } from './src/generated/instructions/delegateDataV1';
import { getDelegateLockedTransferV1InstructionDataSerializer } from './src/generated/instructions/delegateLockedTransferV1';
import { getDelegateProgrammableConfigItemV1InstructionDataSerializer } from './src/generated/instructions/delegateProgrammableConfigItemV1';
import { getDelegateProgrammableConfigV1InstructionDataSerializer } from './src/generated/instructions/delegateProgrammableConfigV1';
import { getDelegateSaleV1InstructionDataSerializer } from './src/generated/instructions/delegateSaleV1';
import { getDelegateStakingV1InstructionDataSerializer } from './src/generated/instructions/delegateStakingV1';
import { getDelegateStandardV1InstructionDataSerializer } from './src/generated/instructions/delegateStandardV1';
import { getDelegateTransferV1InstructionDataSerializer } from './src/generated/instructions/delegateTransferV1';
import { getDelegateUtilityV1InstructionDataSerializer } from './src/generated/instructions/delegateUtilityV1';
import { getDeprecatedMintNewEditionFromMasterEditionViaPrintingTokenInstructionDataSerializer } from './src/generated/instructions/deprecatedMintNewEditionFromMasterEditionViaPrintingToken';
import { getFreezeDelegatedAccountInstructionDataSerializer } from './src/generated/instructions/freezeDelegatedAccount';
import { getLockV1InstructionDataSerializer } from './src/generated/instructions/lockV1';
import { getMigrateInstructionDataSerializer } from './src/generated/instructions/migrate';
import { getMintNewEditionFromMasterEditionViaTokenInstructionDataSerializer } from './src/generated/instructions/mintNewEditionFromMasterEditionViaToken';
import { getMintNewEditionFromMasterEditionViaVaultProxyInstructionDataSerializer } from './src/generated/instructions/mintNewEditionFromMasterEditionViaVaultProxy';
import { getMintV1InstructionDataSerializer } from './src/generated/instructions/mintV1';
import { getPrintV1InstructionDataSerializer } from './src/generated/instructions/printV1';
import { getPuffMetadataInstructionDataSerializer } from './src/generated/instructions/puffMetadata';
import { getRemoveCreatorVerificationInstructionDataSerializer } from './src/generated/instructions/removeCreatorVerification';
import { getRevokeAuthorityItemV1InstructionDataSerializer } from './src/generated/instructions/revokeAuthorityItemV1';
import { getRevokeCollectionAuthorityInstructionDataSerializer } from './src/generated/instructions/revokeCollectionAuthority';
import { getRevokeCollectionItemV1InstructionDataSerializer } from './src/generated/instructions/revokeCollectionItemV1';
import { getRevokeCollectionV1InstructionDataSerializer } from './src/generated/instructions/revokeCollectionV1';
import { getRevokeDataItemV1InstructionDataSerializer } from './src/generated/instructions/revokeDataItemV1';
import { getRevokeDataV1InstructionDataSerializer } from './src/generated/instructions/revokeDataV1';
import { getRevokeLockedTransferV1InstructionDataSerializer } from './src/generated/instructions/revokeLockedTransferV1';
import { getRevokeMigrationV1InstructionDataSerializer } from './src/generated/instructions/revokeMigrationV1';
import { getRevokeProgrammableConfigItemV1InstructionDataSerializer } from './src/generated/instructions/revokeProgrammableConfigItemV1';
import { getRevokeProgrammableConfigV1InstructionDataSerializer } from './src/generated/instructions/revokeProgrammableConfigV1';
import { getRevokeSaleV1InstructionDataSerializer } from './src/generated/instructions/revokeSaleV1';
import { getRevokeStakingV1InstructionDataSerializer } from './src/generated/instructions/revokeStakingV1';
import { getRevokeStandardV1InstructionDataSerializer } from './src/generated/instructions/revokeStandardV1';
import { getRevokeTransferV1InstructionDataSerializer } from './src/generated/instructions/revokeTransferV1';
import { getRevokeUseAuthorityInstructionDataSerializer } from './src/generated/instructions/revokeUseAuthority';
import { getRevokeUtilityV1InstructionDataSerializer } from './src/generated/instructions/revokeUtilityV1';
import { getSetAndVerifyCollectionInstructionDataSerializer } from './src/generated/instructions/setAndVerifyCollection';
import { getSetAndVerifySizedCollectionItemInstructionDataSerializer } from './src/generated/instructions/setAndVerifySizedCollectionItem';
import { getSetCollectionSizeInstructionDataSerializer } from './src/generated/instructions/setCollectionSize';
import { getSetTokenStandardInstructionDataSerializer } from './src/generated/instructions/setTokenStandard';
import { getSignMetadataInstructionDataSerializer } from './src/generated/instructions/signMetadata';
import { getThawDelegatedAccountInstructionDataSerializer } from './src/generated/instructions/thawDelegatedAccount';
import { getTransferOutOfEscrowInstructionDataSerializer } from './src/generated/instructions/transferOutOfEscrow';
import { getUnlockV1InstructionDataSerializer } from './src/generated/instructions/unlockV1';
import { getUnverifyCollectionInstructionDataSerializer } from './src/generated/instructions/unverifyCollection';
import { getUnverifyCollectionV1InstructionDataSerializer } from './src/generated/instructions/unverifyCollectionV1';
import { getUnverifyCreatorV1InstructionDataSerializer } from './src/generated/instructions/unverifyCreatorV1';
import { getUnverifySizedCollectionItemInstructionDataSerializer } from './src/generated/instructions/unverifySizedCollectionItem';
import { getUpdateAsAuthorityItemDelegateV2InstructionDataSerializer } from './src/generated/instructions/updateAsAuthorityItemDelegateV2';
import { getUpdateAsCollectionDelegateV2InstructionDataSerializer } from './src/generated/instructions/updateAsCollectionDelegateV2';
import { getUpdateAsCollectionItemDelegateV2InstructionDataSerializer } from './src/generated/instructions/updateAsCollectionItemDelegateV2';
import { getUpdateAsDataDelegateV2InstructionDataSerializer } from './src/generated/instructions/updateAsDataDelegateV2';
import { getUpdateAsDataItemDelegateV2InstructionDataSerializer } from './src/generated/instructions/updateAsDataItemDelegateV2';
import { getUpdateAsProgrammableConfigDelegateV2InstructionDataSerializer } from './src/generated/instructions/updateAsProgrammableConfigDelegateV2';
import { getUpdateAsProgrammableConfigItemDelegateV2InstructionDataSerializer } from './src/generated/instructions/updateAsProgrammableConfigItemDelegateV2';
import { getUpdateAsUpdateAuthorityV2InstructionDataSerializer } from './src/generated/instructions/updateAsUpdateAuthorityV2';
import { getUpdateMetadataAccountV2InstructionDataSerializer } from './src/generated/instructions/updateMetadataAccountV2';
import { getUpdatePrimarySaleHappenedViaTokenInstructionDataSerializer } from './src/generated/instructions/updatePrimarySaleHappenedViaToken';
import { getUpdateV1InstructionDataSerializer } from './src/generated/instructions/updateV1';
import { getUseV1InstructionDataSerializer } from './src/generated/instructions/useV1';
import { getUtilizeInstructionDataSerializer } from './src/generated/instructions/utilize';
import { getVerifyCollectionInstructionDataSerializer } from './src/generated/instructions/verifyCollection';
import { getVerifyCollectionV1InstructionDataSerializer } from './src/generated/instructions/verifyCollectionV1';
import { getVerifyCreatorV1InstructionDataSerializer } from './src/generated/instructions/verifyCreatorV1';
import { getVerifySizedCollectionItemInstructionDataSerializer } from './src/generated/instructions/verifySizedCollectionItem';

export class MplTokenMetadataIdlDecoder extends BaseIdlDecoder {
    // Analyze all the files in generated/instructions and fill this map with discriminator as key and serializer function as value

    private readonly instructions: Record<number, Serializer<any, any> | Record<number, Serializer<any, any>>> = {
        23: getApproveCollectionAuthorityInstructionDataSerializer(),
        20: getApproveUseAuthorityInstructionDataSerializer(),
        36: getBubblegumSetCollectionSizeInstructionDataSerializer(),
        37: getBurnEditionNftInstructionDataSerializer(),
        29: getBurnNftInstructionDataSerializer(),
        41: getBurnV1InstructionDataSerializer(),
        39: getCloseEscrowAccountInstructionDataSerializer(),
        54: getCollectInstructionDataSerializer(),
        12: getConvertMasterEditionV1ToV2InstructionDataSerializer(),
        38: getCreateEscrowAccountInstructionDataSerializer(),
        17: getCreateMasterEditionV3InstructionDataSerializer(),
        33: getCreateMetadataAccountV3InstructionDataSerializer(),
        42: getCreateV1InstructionDataSerializer(),
        44: {
               9: getDelegateAuthorityItemV1InstructionDataSerializer(),
               11: getDelegateCollectionItemV1InstructionDataSerializer(),
               0: getDelegateCollectionV1InstructionDataSerializer(),
               10: getDelegateDataItemV1InstructionDataSerializer(),
               3: getDelegateDataV1InstructionDataSerializer(),
               7: getDelegateLockedTransferV1InstructionDataSerializer(),
               12: getDelegateProgrammableConfigItemV1InstructionDataSerializer(),
               8: getDelegateProgrammableConfigV1InstructionDataSerializer(),
               1: getDelegateSaleV1InstructionDataSerializer(),
               5: getDelegateStakingV1InstructionDataSerializer(),
               6: getDelegateStandardV1InstructionDataSerializer(),
               2: getDelegateTransferV1InstructionDataSerializer(),
               4: getDelegateUtilityV1InstructionDataSerializer(),
               
             },
        3: getDeprecatedMintNewEditionFromMasterEditionViaPrintingTokenInstructionDataSerializer(),
        26: getFreezeDelegatedAccountInstructionDataSerializer(), 
        46: {
            
            0: getLockV1InstructionDataSerializer(),
            }, 
        48: getMigrateInstructionDataSerializer(),
        11: getMintNewEditionFromMasterEditionViaTokenInstructionDataSerializer(),
        13: getMintNewEditionFromMasterEditionViaVaultProxyInstructionDataSerializer(),
        43: {
            0: getMintV1InstructionDataSerializer(),
            },
        55:{
        
            0: getPrintV1InstructionDataSerializer(),
           },
        14: getPuffMetadataInstructionDataSerializer(),
        28: getRemoveCreatorVerificationInstructionDataSerializer(),
        45: {
            10: getRevokeAuthorityItemV1InstructionDataSerializer(),
            12: getRevokeCollectionItemV1InstructionDataSerializer(),
            0: getRevokeCollectionV1InstructionDataSerializer(),
            11: getRevokeDataItemV1InstructionDataSerializer(),
            3: getRevokeDataV1InstructionDataSerializer(),
            7: getRevokeLockedTransferV1InstructionDataSerializer(),
            9: getRevokeMigrationV1InstructionDataSerializer(),
            13: getRevokeProgrammableConfigItemV1InstructionDataSerializer(),
            8: getRevokeProgrammableConfigV1InstructionDataSerializer(),
            1: getRevokeSaleV1InstructionDataSerializer(),
            5: getRevokeStakingV1InstructionDataSerializer(),
            6: getRevokeStandardV1InstructionDataSerializer(),
            2: getRevokeTransferV1InstructionDataSerializer(),
            4: getRevokeUtilityV1InstructionDataSerializer(),


            },
        24: getRevokeCollectionAuthorityInstructionDataSerializer(),
        21: getRevokeUseAuthorityInstructionDataSerializer(),
        25: getSetAndVerifyCollectionInstructionDataSerializer(),
        32: getSetAndVerifySizedCollectionItemInstructionDataSerializer(),
        34: getSetCollectionSizeInstructionDataSerializer(),
        35: getSetTokenStandardInstructionDataSerializer(),
        7: getSignMetadataInstructionDataSerializer(),
        27: getThawDelegatedAccountInstructionDataSerializer(),
        40: getTransferOutOfEscrowInstructionDataSerializer(),
        49:{
            0: getTransferV1InstructionDataSerializer(),
           },
        47:{
            0: getUnlockV1InstructionDataSerializer(),
           },
        22: getUnverifyCollectionInstructionDataSerializer(),
        53:{
            1: getUnverifyCollectionV1InstructionDataSerializer(),
            0: getUnverifyCreatorV1InstructionDataSerializer(),

           },
        31: getUnverifySizedCollectionItemInstructionDataSerializer(),
        50:{

            2: getUpdateAsAuthorityItemDelegateV2InstructionDataSerializer(), 
            3: getUpdateAsCollectionDelegateV2InstructionDataSerializer(),
            7: getUpdateAsCollectionItemDelegateV2InstructionDataSerializer(),
            4: getUpdateAsDataDelegateV2InstructionDataSerializer(),
            6: getUpdateAsDataItemDelegateV2InstructionDataSerializer(),
            5: getUpdateAsProgrammableConfigDelegateV2InstructionDataSerializer(),
            8: getUpdateAsProgrammableConfigItemDelegateV2InstructionDataSerializer(),
            1: getUpdateAsUpdateAuthorityV2InstructionDataSerializer(),
            0: getUpdateV1InstructionDataSerializer(),

            },
        15: getUpdateMetadataAccountV2InstructionDataSerializer(),
        4: getUpdatePrimarySaleHappenedViaTokenInstructionDataSerializer(),
        51:{
            0: getUseV1InstructionDataSerializer(),
            
        },
        19: getUtilizeInstructionDataSerializer(),
        18: getVerifyCollectionInstructionDataSerializer(),
        52:{
            1: getVerifyCollectionV1InstructionDataSerializer(),
            0: getVerifyCreatorV1InstructionDataSerializer(),
        },
        30: getVerifySizedCollectionItemInstructionDataSerializer(),


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
