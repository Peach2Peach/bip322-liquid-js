import * as liquid from 'liquidjs-lib'

// P2WPKH scriptPubKey should be 0014<20-BYTE-PUBKEY-HASH>
const BYTE_LENGTH_P2WPKH = 22
// and P2WSH scriptPubKey should be 0014<32-BYTE-PUBKEY-HASH>
const BYTE_LENGTH_P2WSH = 34

const ADDRESS_LENGTH_P2WPKH = 42
const ADDRESS_LENGTH_P2WPKH_TESTNET = 43
const WITNESS_BYTE_LENGTH_P2WPKH = 33

class Address {
  static toXOnly (pubKey) {
    return Buffer.from(pubKey.length === 32 ? pubKey : pubKey.subarray(1, 33))
  }

  /**
   * Check if a given Liquid address is a pay-to-public-key-hash (p2pkh) address.
   * @param address Liquid address to be checked
   * @returns True if the provided address correspond to a valid P2PKH address, false if otherwise
   */
  public static isP2PKH (address: string) {
    return /^[PQF2]/u.test(address)
  }

  /**
   * Check if a given Liquid address is a pay-to-script-hash (P2SH) address.
   * @param address Liquid address to be checked
   * @returns True if the provided address correspond to a valid P2SH address, false if otherwise
   */
  public static isP2SH (address: string) {
    return /^[GH89x]/u.test(address)
  }

  /**
   * Check if a given Liquid address is a pay-to-witness-public-key-hash (P2WPKH) address.
   * This also includes confidential addresses
   * @param address Liquid address to be checked
   * @returns True if the provided address correspond to a valid P2WPKH address, false if otherwise
   */
  public static isP2WPKH (address: string) {
    if (!/^(ex1q|tex1q|ert1q)/u.test(address)) return false
    const scriptPubKey = this.convertAdressToScriptPubkey(address)
    return scriptPubKey.byteLength === BYTE_LENGTH_P2WPKH
  }

  /**
   * Check if a given Liquid address is a pay-to-witness-script-hash (P2WSH) address.
   * @param address Liquid address to be checked
   * @returns True if the provided address correspond to a valid P2WSH address, false if otherwise
   */
  public static isP2WSH (address: string) {
    if (!/^(ex1q|tex1q|ert1q)/u.test(address)) return false
    const scriptPubKey = this.convertAdressToScriptPubkey(address)
    return scriptPubKey.byteLength === BYTE_LENGTH_P2WSH
  }

  /**
   * Check if a given Liquid address is a pay-to-public-key-hash (p2pkh) confidential address.
   * @param address Liquid address to be checked
   * @returns True if the provided address correspond to a valid confidential P2PKH address, false if otherwise
   */
  public static isConfidentialP2PKH (address: string) {
    return /^(VTq|VTp|vTS|CTE)/u.test(address)
  }

  /**
   * Check if a given Liquid address is a pay-to-script-hash (P2SH) confidential address.
   * @param address Liquid address to be checked
   * @returns True if the provided address correspond to a valid confidential P2SH address, false if otherwise
   */
  public static isConfidentialP2SH (address: string) {
    return /^(VJL|vjT|vjU|Azp)/u.test(address)
  }

  /**
   * Check if a given Liquid address is a pay-to-witness-script-hash (P2WSH) confidential address.
   * @param address Liquid address to be checked
   * @returns True if the provided address correspond to a valid P2WSH address, false if otherwise
   */
  public static isConfidentialP2WSH (address: string) {
    if (!/^(lq1qq|tlq1qq|elq1qq)/u.test(address)) return false
    const scriptPubKey = this.convertAdressToScriptPubkey(address)
    return scriptPubKey.byteLength === BYTE_LENGTH_P2WSH
  }

  /**
   * Check if a given witness stack corresponds to a P2WPKH address.
   * @param witness Witness data associated with the toSign BIP-322 transaction
   * @returns True if the provided witness stack correspond to a valid P2WPKH address, false if otherwise
   */
  public static isP2WPKHWitness (witness: Buffer[]) {
    // It should contain exactly two items, with the second item being a public key with 33 bytes,
    // and the first byte must be either 0x02/0x03
    return witness.length === 2
      && witness[1].byteLength === WITNESS_BYTE_LENGTH_P2WPKH
      && (witness[1][0] === 0x02 || witness[1][0] === 0x03)
  }

  /**
   * Check if a given witness stack corresponds to a single-key-spend P2TR address.
   * @param witness Witness data associated with the toSign BIP-322 transaction
   * @returns True if the provided address and witness stack correspond to a valid single-key-spend P2TR address
   * false if otherwise
   */
  public static isSingleKeyP2TRWitness (witness: Buffer[]) {
    // Check whether the witness stack is as expected for a single-key-spend taproot address
    // It should contain exactly one items which is the signature for the transaction
    return witness.length === 1
  }

  /**
   * Determine network type by checking addresses prefixes
   * @param address Liquid address
   * @returns Network type
   */
  public static getNetworkFromAddess (address: string) {
    if (/^(ex1q|P|Q|G|H|VTq|VTp)/u.test(address)) return liquid.networks.liquid
    if (/^(tex1q|F|8|9|tlq1qq|vTS|vjT|vjU)/u.test(address)) return liquid.networks.testnet
    if (/^(ert1q|2|X|lq1qq|elq1qq|CT|VJL|Azp)/u.test(address)) return liquid.networks.regtest

    return liquid.networks.liquid
  }

  /**
   * Convert a given Liquid address into its corresponding script public key.
   * @param address Liquid address
   * @returns Script public key of the given Liquid address
   * @throws Error when the provided address is not a valid Liquid address
   */
  public static convertAdressToScriptPubkey (address: string) {
    if (/^(ex1q|tex1q|ert1q)/u.test(address)) {
      if (address.length === ADDRESS_LENGTH_P2WPKH || address.length === ADDRESS_LENGTH_P2WPKH_TESTNET) {
        return liquid.payments.p2wpkh({
          address,
          network: this.getNetworkFromAddess(address),
        }).output
      }
      return liquid.payments.p2wsh({
        address,
        network: this.getNetworkFromAddess(address),
      }).output
    } else if (this.isP2PKH(address)) {
      return liquid.payments.p2pkh({
        address,
        network: this.getNetworkFromAddess(address),
      }).output
    } else if (this.isP2SH(address)) {
      return liquid.payments.p2sh({
        address,
        network: this.getNetworkFromAddess(address),
      }).output
    }
    throw new Error('Unknown address type')
  }

  /**
   * Convert a given public key into a corresponding Liquid address.
   * @param publicKey Public key for deriving the address, or internal public key for deriving taproot address
   * @param addressType Liquid address type to be derived, must be either 'p2pkh', 'p2sh-p2wpkh', 'p2wpkh'
   * @returns Liquid address that correspond to the given public key in both mainnet and testnet
   */
  public static convertPubKeyIntoAddress (
    publicKey: Buffer,
    addressType: 'p2pkh' | 'p2sh-p2wpkh' | 'p2wpkh',
    network: liquid.networks.Network = liquid.networks.liquid,
  ) {
    switch (addressType) {
    case 'p2pkh':
      return liquid.payments.p2pkh({ pubkey: publicKey, network }).address
    case 'p2sh-p2wpkh':
      return liquid.payments.p2sh({
        redeem: liquid.payments.p2wpkh({ pubkey: publicKey, network }),
        network,
      }).address
    case 'p2wpkh':
      return liquid.payments.p2wpkh({ pubkey: publicKey, network }).address
    default:
      throw new Error('Cannot convert public key into unsupported address type.')
    }
  }

}

export default Address
