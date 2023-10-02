const decodeNumber = async (num: string, _: unknown, stack: unknown[]) => {
    try {
        return Number(num);
    } catch (e) {
        throw new Error(
            `Decode Number Error: ${stack.join('.')}, with error: ${e}`
        );
    }
};

// const decodeBigInt = async (num: string, _: unknown, stack: unknown[]) => {
//   try {
//     return BigInt(num);
//   } catch (e) {
//     throw new Error(
//       `Decode Big Number Error: ${stack.join('.')}, with error: ${e}`
//     );
//   }
// };

export const customDecoders = {
    UInt: decodeNumber,
    Int: decodeNumber,
    UInt8: decodeNumber,
    Int8: decodeNumber,
    UInt16: decodeNumber,
    Int16: decodeNumber,
    UInt32: decodeNumber,
    Int32: decodeNumber,
    Word8: decodeNumber,
    Word16: decodeNumber,
    Word32: decodeNumber
};