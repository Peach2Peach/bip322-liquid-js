import ecc from '@bitcoinerlab/secp256k1'
import * as bitcoin from 'bitcoinjs-lib'
import { expect } from 'chai'
import ECPairFactory from 'ecpair'
import { BIP322 } from '../src'

// Test vector listed at
// https://github.com/bitcoin/bips/blob/master/bip-0322.mediawiki#user-content-Transaction_Hashes
// https://github.com/bitcoin/bitcoin/blob/29b28d07fa958b89e1c7916fda5d8654474cf495/src/test/util_tests.cpp#L2713
describe('BIP322 Test', () => {

  it('Produce correct message hash', () => {
    const emptyStringHash = BIP322.hashMessage('')
    const helloWorldHash = BIP322.hashMessage('Hello World')

    expect(Buffer.from(emptyStringHash).toString('hex')
      .toLowerCase()).to.equal('c90c269c4f8fcbe6880f72a721ddfbf1914268a794cbb21cfafee13770ae19f1')
    expect(Buffer.from(helloWorldHash).toString('hex')
      .toLowerCase()).to.equal('f0eb03b1a75ac6d9847f55c624a99169b5dccba2a31f5b23bea77ba270de0a7a')
  })

  it('Draft correct BIP-322 toSpend transaction', () => {
    // Obtain the script public key
    const scriptPubKey = bitcoin.payments.p2wpkh({
      address: 'bc1q9vza2e8x573nczrlzms0wvx3gsqjx7vavgkx0l',
    }).output as Buffer

    // Draft a toSpend transaction with empty message
    const emptyStringToSpendTx = BIP322.buildToSpendTx('', scriptPubKey)
    // Draft a toSpend transaction with Hello World
    const helloWorldToSpendTx = BIP322.buildToSpendTx('Hello World', scriptPubKey)

    // eslint-disable-next-line max-len
    expect(emptyStringToSpendTx.getId().toLowerCase()).to.equal('c5680aa69bb8d860bf82d4e9cd3504b55dde018de765a91bb566283c545a99a7')
    // eslint-disable-next-line max-len
    expect(helloWorldToSpendTx.getId().toLowerCase()).to.equal('b79d196740ad5217771c1098fc4a4b51e0535c32236c71f1ea4d61a2d603352b')
  })

  it('Draft correct BIP-322 toSign transaction', () => {
    // Obtain the script public key
    const scriptPubKey = bitcoin.payments.p2wpkh({
      address: 'bc1q9vza2e8x573nczrlzms0wvx3gsqjx7vavgkx0l',
    }).output as Buffer
    // Initialize private key used to sign the transaction
    const ECPair = ECPairFactory(ecc)
    const testPrivateKey = ECPair.fromWIF(
      'L3VFeEujGtevx9w18HD1fhRbCH67Az2dpCymeRE1SoPK6XQtaN2k',
    )
    const emptyStringToSpendTxId = 'c5680aa69bb8d860bf82d4e9cd3504b55dde018de765a91bb566283c545a99a7'
    const helloWorldToSpendTxId = 'b79d196740ad5217771c1098fc4a4b51e0535c32236c71f1ea4d61a2d603352b'

    // Draft a toSign transaction with empty message
    const emptyStringToSignTx = BIP322.buildToSignTx(emptyStringToSpendTxId, scriptPubKey)
    // Draft a toSign transaction with Hello World
    const helloWorldToSignTx = BIP322.buildToSignTx(helloWorldToSpendTxId, scriptPubKey)

    // Sign both toSign transaction
    const emptyStringToSignTxSigned = emptyStringToSignTx.signAllInputs(testPrivateKey).finalizeAllInputs()
      .extractTransaction()
    const helloWorldToSignTxSigned = helloWorldToSignTx.signAllInputs(testPrivateKey).finalizeAllInputs()
      .extractTransaction()
    // Assert the transaction ID is as expected
    // eslint-disable-next-line max-len
    expect(emptyStringToSignTxSigned.getId().toLowerCase()).to.equal('1e9654e951a5ba44c8604c4de6c67fd78a27e81dcadcfe1edf638ba3aaebaed6')
    // eslint-disable-next-line max-len
    expect(helloWorldToSignTxSigned.getId().toLowerCase()).to.equal('88737ae86f2077145f93cc4b153ae9a1cb8d56afa511988c149c5c8c9d93bddf')
  })

  it('Encode signed BIP-322 PSBT into signature correctly', () => {
    // Obtain the script public key
    const scriptPubKey = bitcoin.payments.p2wpkh({
      address: 'bc1q9vza2e8x573nczrlzms0wvx3gsqjx7vavgkx0l',
    }).output as Buffer
    // Initialize private key used to sign the transaction
    const ECPair = ECPairFactory(ecc)
    const testPrivateKey = ECPair.fromWIF(
      'L3VFeEujGtevx9w18HD1fhRbCH67Az2dpCymeRE1SoPK6XQtaN2k',
    )
    // Draft and sign a toSign transaction with Hello World
    const toSpendTxId = 'b79d196740ad5217771c1098fc4a4b51e0535c32236c71f1ea4d61a2d603352b'
    const toSignTx = BIP322.buildToSignTx(toSpendTxId, scriptPubKey)
    const toSignTxSigned = toSignTx.signAllInputs(testPrivateKey).finalizeAllInputs()

    const signature = BIP322.encodeWitness(toSignTxSigned)

    // eslint-disable-next-line max-len
    expect(signature).to.equal('AkgwRQIhAOzyynlqt93lOKJr+wmmxIens//zPzl9tqIOua93wO6MAiBi5n5EyAcPScOjf1lAqIUIQtr3zKNeavYabHyR8eGhowEhAsfxIAMZZEKUPYWI4BruhAQjzFT8FSFSajuFwrDL1Yhy')
  })

  it('Throw error when trying to encode witness from unsigned PSBT', () => {
    // Obtain the script public key
    const scriptPubKey = bitcoin.payments.p2wpkh({
      address: 'bc1q9vza2e8x573nczrlzms0wvx3gsqjx7vavgkx0l',
    }).output as Buffer
    // Draft a toSign transaction with Hello World
    const toSpendTxId = 'b79d196740ad5217771c1098fc4a4b51e0535c32236c71f1ea4d61a2d603352b'
    const toSignTx = BIP322.buildToSignTx(toSpendTxId, scriptPubKey)

    const result = BIP322.encodeWitness.bind(BIP322, toSignTx)

    expect(result).to.throws('Cannot encode empty witness stack.')
  })

})
