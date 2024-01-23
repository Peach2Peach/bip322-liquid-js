// Import dependencies
import ecc from '@bitcoinerlab/secp256k1'
import * as bitcoin from 'bitcoinjs-lib'
import * as bitcoinMessage from 'bitcoinjs-message'
import ECPairFactory from 'ecpair'
import * as liquid from 'liquidjs-lib'
import BIP322 from './BIP322'
import { Address } from './helpers'

const ECPair = ECPairFactory(ecc)

/**
 * Class that signs BIP-322 signature using a private key.
 * Reference: https://github.com/LegReq/bip0322-signatures/blob/master/BIP0322_signing.ipynb
 */
class Signer {

  /**
   * Sign a BIP-322 signature from P2WPKH, P2SH-P2WPKH,
   * and single-key-spend P2TR address and its corresponding private key.
   * @param privateKey Private key used to sign the message
   * @param address Address to be signing the message
   * @param message message_challenge to be signed by the address
   * @param network Network that the address is located, defaults to the liquid mainnet
   * @returns BIP-322 simple signature, encoded in base-64
   */
  public static sign (
    privateKey: string,
    address: string,
    message: string,
    network: liquid.networks.Network = liquid.networks.liquid,
  ) {
    const signer = ECPair.fromWIF(privateKey, network)

    if (!this.checkPubKeyCorrespondToAddress(signer.publicKey, address, network)) {
      throw new Error(`Invalid private key provided for signing message for ${address}.`)
    }
    if (Address.isP2PKH(address)) {
      // For P2PKH address, sign a legacy signature
      // eslint-disable-next-line max-len
      // Reference: https://github.com/bitcoinjs/bitcoinjs-message/blob/c43430f4c03c292c719e7801e425d887cbdf7464/README.md?plain=1#L21
      return bitcoinMessage.sign(message, signer.privateKey, signer.compressed)
    }
    const scriptPubKey = Address.convertAdressToScriptPubkey(address)
    // Draft corresponding toSpend using the message and script pubkey
    const toSpendTx = BIP322.buildToSpendTx(message, scriptPubKey)
    // Draft corresponding toSign transaction based on the address type
    let toSignTx: bitcoin.Psbt
    if (Address.isP2WPKH(address)) {
      toSignTx = BIP322.buildToSignTx(toSpendTx.getId(), scriptPubKey)
    }
    const toSignTxSigned = toSignTx.signAllInputs(signer, [liquid.Transaction.SIGHASH_ALL]).finalizeAllInputs()
    return BIP322.encodeWitness(toSignTxSigned)
  }

  /**
   * Check if a given public key is the public key for a claimed address.
   * @param publicKey Public key to be tested
   * @param claimedAddress Address claimed to be derived based on the provided public key
   * @returns True if the claimedAddress can be derived by the provided publicKey, false if otherwise
   */
  private static checkPubKeyCorrespondToAddress (
    publicKey: Buffer,
    claimedAddress: string,
    network: liquid.networks.Network = liquid.networks.liquid,
  ) {
    // Derive the same address type from the provided public key
    let derivedAddresses

    if (Address.isP2PKH(claimedAddress)) {
      derivedAddresses = Address.convertPubKeyIntoAddress(publicKey, 'p2pkh', network)
    } else if (Address.isP2WPKH(claimedAddress)) {
      derivedAddresses = Address.convertPubKeyIntoAddress(publicKey, 'p2wpkh', network)
    } else {
      throw new Error('Unable to sign BIP-322 message for unsupported address type.') // Unsupported address type
    }
    return derivedAddresses === claimedAddress
  }

}

export default Signer
