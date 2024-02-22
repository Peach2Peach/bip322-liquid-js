import ecc from '@bitcoinerlab/secp256k1'
import * as bitcoin from 'bitcoinjs-lib'
import * as bitcoinMessage from 'bitcoinjs-message'
import * as liquid from 'liquidjs-lib'
import BIP322 from './BIP322'
import { decodeScriptSignature } from './bitcoinjs'
import { Address, BIP137 } from './helpers'

/**
 * Class that handles BIP-322 signature verification.
 * Reference: https://github.com/LegReq/bip0322-signatures/blob/master/BIP0322_verification.ipynb
 */
class Verifier {

  /**
   * Verify a BIP-322 signature from P2WPKH, P2SH-P2WPKH, and single-key-spend P2TR address.
   * @param signerAddress Address of the signing address
   * @param message message_challenge signed by the address
   * @param signatureBase64 Signature produced by the signing address
   * @returns True if the provided signature is a valid BIP-322 signature for the given message and address,
   * false if otherwise
   * @throws If the provided signature fails basic validation, or if unsupported address and signature are provided
     */
  // eslint-disable-next-line max-lines-per-function, max-statements
  public static verifySignature (signerAddress: string, message: string, signatureBase64: string) {
    const network = Address.getNetworkFromAddess(signerAddress)
    // Handle legacy BIP-137 signature
    // For P2PKH address, assume the signature is also a legacy signature
    if (Address.isP2PKH(signerAddress) || BIP137.isBIP137Signature(signatureBase64)) {
      return this.verifyBIP137Signature(signerAddress, message, signatureBase64, network)
    }
    // Convert address into corresponding script pubkey
    const scriptPubKey = Address.convertAdressToScriptPubkey(signerAddress)
    // Draft corresponding toSpend and toSign transaction using the message and script pubkey
    const toSpendTx = BIP322.buildToSpendTx(message, scriptPubKey)
    const toSignTx = BIP322.buildToSignTx(toSpendTx.getId(), scriptPubKey)
    // Add the witness stack into the toSignTx
    toSignTx.updateInput(0, {
      finalScriptWitness: Buffer.from(signatureBase64, 'base64'),
    })
    // Obtain the signature within the witness components
    const [{ witness }] = toSignTx.extractTransaction().ins
    const [encodedSignature] = witness
    // Branch depending on whether the signing address is a non-taproot or a taproot address
    if (Address.isP2WPKHWitness(witness)) {
      // For non-taproot segwit transaciton, public key is included as the second part of the witness data
      const [, publicKey] = witness
      const { signature } = decodeScriptSignature(encodedSignature)
      // Compute OP_HASH160(publicKey)
      const hashedPubkey = liquid.crypto.hash160(publicKey)
      // Common path variable
      let hashToSign: Buffer // Hash expected to be signed by the signing address
      if (Address.isP2SH(signerAddress)) {
        // P2SH-P2WPKH verification path
        // Compute the hash that correspond to the toSignTx
        hashToSign = this.getHashForSigP2SHInP2WPKH(toSignTx, hashedPubkey)
        // The original locking script for P2SH-P2WPKH is OP_0 <PubKeyHash>
        const lockingScript = Buffer.concat([Buffer.from([0x00, 0x14]), hashedPubkey])
        // Compute OP_HASH160(lockingScript)
        const hashedLockingScript = liquid.crypto.hash160(lockingScript)
        // For nested segwit (P2SH-P2WPKH) address
        // the hashed locking script is located from the 3rd byte to the last 2nd byte as OP_HASH160 <HASH> OP_EQUAL
        const hashedLockingScriptInScriptPubKey = Buffer.from(scriptPubKey.subarray(2, -1))
        // Check if the P2SH locking script OP_HASH160 <HASH> OP_EQUAL is satisified
        if (Buffer.compare(hashedLockingScript, hashedLockingScriptInScriptPubKey) !== 0) {
          // Reject signature if the hashed locking script is different
          // from the hashed locking script in the scriptPubKey
          return false
        }
      } else {
        // P2WPKH verification path
        // Compute the hash that correspond to the toSignTx
        hashToSign = this.getHashForSigP2WPKH(toSignTx)
        // For native segwit address, the hashed public key is located from the 3rd to the end as OP_0 <HASH>
        const hashedPubkeyInScriptPubkey = Buffer.from(scriptPubKey.subarray(2))
        // Check if OP_HASH160(publicKey) === hashedPubkeyInScriptPubkey
        if (Buffer.compare(hashedPubkey, hashedPubkeyInScriptPubkey) !== 0) {
          return false // Reject signature if the hashed public key did not match
        }
      }
      // Computing OP_CHECKSIG in Javascript
      return ecc.verify(hashToSign, publicKey, signature)
    }

    throw new Error('Unsupported address is provided.')

  }

  /**
   * Verify a legacy BIP-137 signature.
   * Note that a signature is considered valid for all types of addresses
   * that can be derived from the recovered public key.
   * @param signerAddress Address of the signing address
   * @param message message_challenge signed by the address
   * @param signatureBase64 Signature produced by the signing address
   * @returns True if the provided signature is a valid BIP-137 signature for the given message and address,
   * false if otherwise
   * @throws If the provided signature fails basic validation, or if unsupported address and signature are provided
     */
  private static verifyBIP137Signature (
    signerAddress: string,
    message: string,
    signatureBase64: string,
    network: liquid.networks.Network = liquid.networks.liquid,
  ) {
    if (Address.isP2PKH(signerAddress)) {
      return bitcoinMessage.verify(message, signerAddress, signatureBase64)
    }

    // Recover the public key associated with the signature
    const publicKeySigned = BIP137.derivePubKey(message, signatureBase64)
    // Set the equivalent legacy address to prepare for validation from bitcoinjs-message
    const legacySigningAddress = Address.convertPubKeyIntoAddress(publicKeySigned, 'p2pkh', network)
    // Make sure that public key recovered corresponds to the claimed signing address
    if (Address.isP2SH(signerAddress)) {
      // Assume it is a P2SH-P2WPKH address, derive a P2SH-P2WPKH address based on the public key recovered
      const p2shAddressDerived = Address.convertPubKeyIntoAddress(publicKeySigned, 'p2sh-p2wpkh', network)
      // Assert that the derived address is identical to the claimed signing address
      if (p2shAddressDerived !== signerAddress) {
        return false // Derived address did not match with the claimed signing address
      }
    } else if (Address.isP2WPKH(signerAddress)) {
      // Assume it is a P2WPKH address, derive a P2WPKH address based on the public key recovered
      const p2wpkhAddressDerived = Address.convertPubKeyIntoAddress(publicKeySigned, 'p2wpkh', network)
      // Assert that the derived address is identical to the claimed signing address
      if (p2wpkhAddressDerived !== signerAddress) {
        return false // Derived address did not match with the claimed signing address
      }
    } else {
      return false // Unsupported address type
    }
    // Validate the signature using bitcoinjs-message if address assertion succeeded
    return bitcoinMessage.verify(message, legacySigningAddress, signatureBase64)

  }

  /**
   * Compute the hash to be signed for a given P2WPKH BIP-322 toSign transaction.
   * @param toSignTx PSBT instance of the toSign transaction
   * @returns Computed transaction hash that requires signing
     */
  private static getHashForSigP2WPKH (toSignTx: bitcoin.Psbt) {
    // Create a signing script to unlock the P2WPKH output based on the P2PKH template
    // eslint-disable-next-line max-len
    // Reference: https://github.com/bitcoinjs/bitcoinjs-lib/blob/1a9119b53bcea4b83a6aa8b948f0e6370209b1b4/ts_src/psbt.ts#L1654
    const signingScript = liquid.payments.p2pkh({
      hash: Buffer.from(toSignTx.data.inputs[0].witnessUtxo.script.subarray(2)),
    }).output
    // Return computed transaction hash to be signed
    return toSignTx.extractTransaction().hashForWitnessV0(
      0,
      signingScript,
      0,
      liquid.Transaction.SIGHASH_ALL,
    )
  }

  /**
   * Compute the hash to be signed for a given P2SH-P2WPKH BIP-322 toSign transaction.
   * @param toSignTx PSBT instance of the toSign transaction
   * @param hashedPubkey Hashed public key of the signing address
   * @returns Computed transaction hash that requires signing
   */
  private static getHashForSigP2SHInP2WPKH (toSignTx: bitcoin.Psbt, hashedPubkey: Buffer) {
    // Create a signing script to unlock the P2WPKH output based on the P2PKH template
    // eslint-disable-next-line max-len
    // Reference: https://github.com/bitcoinjs/bitcoinjs-lib/blob/1a9119b53bcea4b83a6aa8b948f0e6370209b1b4/ts_src/psbt.ts#L1654
    // Like P2WPKH, the hash for deriving the meaningfulScript for a P2SH-P2WPKH transaction is its public key hash
    // It can be derived by hashing the provided public key in the witness stack
    const signingScript = liquid.payments.p2pkh({
      hash: hashedPubkey,
    }).output
    // Return computed transaction hash to be signed
    return toSignTx.extractTransaction().hashForWitnessV0(
      0,
      signingScript,
      0,
      liquid.Transaction.SIGHASH_ALL,
    )
  }

}

export default Verifier
