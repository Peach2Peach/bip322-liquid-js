import * as bitcoinMessage from 'bitcoinjs-message'
import { expect } from 'chai'
import { networks, payments } from 'liquidjs-lib'
import { Signer, Verifier } from '../src'
import { ECPair, generateTestAddresses } from './testHelpers/generateTestAddresses'
import {
  expectedSignature,
  expectedSignatureAlt,
  message,
  privateKey,
  privateKeyTestnet,
} from './testHelpers/testVectors'


describe('Signer Test', () => {
  const testAddresses = generateTestAddresses()

  it('Can sign BIP-137 P2PKH using for liquid', () => {
    const address = testAddresses.liquid.p2pkh
    const signature = Signer.sign(privateKey, address, message, networks.liquid)

    expect(bitcoinMessage.verify(message, address, signature)).to.be.true
    expect(signature.toString('base64')).to.equal(expectedSignature)
  })
  it('Can sign BIP-137 P2PKH using for liquid (testnet)', () => {
    const address = testAddresses.testnet.p2pkh
    const signature = Signer.sign(privateKeyTestnet, address, message, networks.testnet)

    expect(bitcoinMessage.verify(message, address, signature)).to.be.true
    expect(signature.toString('base64')).to.equal(expectedSignature)
  })
  it('Can sign BIP-322 P2WPKH using for liquid', () => {
    const address = testAddresses.liquid.p2wpkh
    const signature = Signer.sign(privateKey, address, message, networks.liquid)

    expect(Verifier.verifySignature(address, message, signature.toString('base64'))).to.be.true
    expect(signature.toString('base64')).to.equal(expectedSignatureAlt)
  })
  it('Can sign BIP-322 P2WPKH using for liquid (testnet)', () => {
    const address = testAddresses.testnet.p2wpkh
    const signature = Signer.sign(privateKeyTestnet, address, message, networks.testnet)

    expect(Verifier.verifySignature(address, message, signature.toString('base64'))).to.be.true
    expect(signature.toString('base64')).to.equal(expectedSignatureAlt)
  })

  it('Can sign BIP-137 P2PKH (confidential) using for liquid', () => {
    const address = testAddresses.liquid.p2pkhConfidential
    const signature = Signer.sign(privateKey, address, message, networks.liquid)

    expect(bitcoinMessage.verify(message, address, signature)).to.be.true
    expect(signature.toString('base64')).to.equal(expectedSignature)
  })
  it('Can sign BIP-137 P2PKH (confidential) using for liquid (testnet)', () => {
    const address = testAddresses.testnet.p2pkhConfidential
    const signature = Signer.sign(privateKeyTestnet, address, message, networks.testnet)

    expect(bitcoinMessage.verify(message, address, signature)).to.be.true
    expect(signature.toString('base64')).to.equal(expectedSignature)
  })
  it('Can sign BIP-322 P2WPKH (confidential) using for liquid', () => {
    const address = testAddresses.liquid.p2wpkhConfidential
    const signature = Signer.sign(privateKey, address, message, networks.liquid)

    expect(Verifier.verifySignature(address, message, signature.toString('base64'))).to.be.true
    expect(signature.toString('base64')).to.equal(expectedSignatureAlt)
  })
  it('Can sign BIP-322 P2WPKH (confidential) using for liquid (testnet)', () => {
    const address = testAddresses.testnet.p2wpkhConfidential
    const signature = Signer.sign(privateKeyTestnet, address, message, networks.testnet)

    expect(Verifier.verifySignature(address, message, signature.toString('base64'))).to.be.true
    expect(signature.toString('base64')).to.equal(expectedSignatureAlt)
  })

  it('Throw when the provided private key cannot derive the given signing address', () => {
    const p2wpkhAddressWrong = 'ex1q2p93defpj4flwp4a5e0y3vupudqgs6kh5txw9z'
    const p2pkhAddressWrong = 'Q4aw8qnw66T77GwnRyhSiAPD9h6wph9MxK'
    const p2pkhConfidentialWrong = 'Q4aw8qnw66T77GwnRyhSiAPD9h6wph9MxK'

    const signP2WPKH = Signer.sign.bind(Signer, privateKey, p2wpkhAddressWrong, message)
    const signP2PKH = Signer.sign.bind(Signer, privateKey, p2pkhAddressWrong, message)
    const signP2PKHConfidential = Signer.sign.bind(Signer, privateKey, p2pkhConfidentialWrong, message)

    expect(signP2WPKH).to.throws(`Invalid private key provided for signing message for ${p2wpkhAddressWrong}.`)
    expect(signP2PKH).to.throws(`Invalid private key provided for signing message for ${p2pkhAddressWrong}.`)

    expect(signP2PKHConfidential).to.throws(
      `Invalid private key provided for signing message for ${p2pkhConfidentialWrong}.`,
    )
  })

  it('Throw when attempting to sign BIP-322 signature using unsupported address type', () => {
    const signer = ECPair.fromWIF(privateKey, networks.liquid)
    const blindkey = ECPair.fromWIF(privateKey, networks.liquid).publicKey
    const p2shAddress = payments.p2sh({
      redeem: payments.p2wpkh({
        pubkey: signer.publicKey,
        network: networks.liquid,
      }),
      network: networks.liquid,
    }).address!
    const p2shConfidentialAddress = payments.p2sh({
      address: p2shAddress,
      blindkey,
      network: networks.liquid,
    }).address!
    const p2wshAddress = 'bc1qeklep85ntjz4605drds6aww9u0qr46qzrv5xswd35uhjuj8ahfcqgf6hak'

    const signP2WSH = Signer.sign.bind(Signer, privateKey, p2wshAddress, message)
    const signP2SH = Signer.sign.bind(Signer, privateKey, p2shAddress, message)
    const signP2SHConfidential = Signer.sign.bind(Signer, privateKey, p2shConfidentialAddress, message)

    expect(signP2WSH).to.throws('Unable to sign BIP-322 message for unsupported address type.')
    expect(signP2SH).to.throws('Unable to sign BIP-322 message for unsupported address type.')
    expect(signP2SHConfidential).to.throws('Unable to sign BIP-322 message for unsupported address type.')
  })

})
