/* eslint-disable max-len */
import { expect } from 'chai'
import { Verifier } from '../src'
import { generateTestAddresses } from './testHelpers/generateTestAddresses'
import { expectedSignature, expectedSignatureAlt, expectedSignatureEmpty, expectedSignatureEmptyAlt, message, messageEmpty } from './testHelpers/testVectors'

// Tests
describe('Verifier Test', () => {
  const addresses = generateTestAddresses()
  // Random address that should fail validation
  const p2wpkhMainnetInvalid = 'bc1q9vza2e8x573nczrlzms0wvx3gsqjx7vavgkx0l'
  const p2wpkhTestnetInvalid = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx'

  it('Can verify legacy P2PKH signature', () => {
    // Test vector copied from https://github.com/bitcoinjs/bitcoinjs-message/blob/c43430f4c03c292c719e7801e425d887cbdf7464/README.md?plain=1#L21
    const addressWrong = '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2'
    const messageWrong = ''

    const resultCorrect = Verifier.verifySignature(addresses.liquid.p2pkh, message, expectedSignature)
    const resultWrongMessage = Verifier.verifySignature(addresses.liquid.p2pkh, messageWrong, expectedSignature)
    const resultWrongAddress = Verifier.verifySignature(addressWrong, message, expectedSignature)

    expect(resultCorrect).to.be.true
    expect(resultWrongMessage).to.be.false
    expect(resultWrongAddress).to.be.false
  })

  it('Can verify legacy P2PKH signature (testnet)', () => {
    // Test vector copied from https://github.com/bitcoinjs/bitcoinjs-message/blob/c43430f4c03c292c719e7801e425d887cbdf7464/README.md?plain=1#L21
    const addressWrongTestnet = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn'
    const messageWrong = ''

    const resultCorrectTestnet = Verifier.verifySignature(addresses.testnet.p2pkh, message, expectedSignature)
    const resultWrongMessageTestnet = Verifier.verifySignature(addresses.testnet.p2pkh, messageWrong, expectedSignature)
    const resultWrongAddressTestnet = Verifier.verifySignature(addressWrongTestnet, message, expectedSignature)

    expect(resultCorrectTestnet).to.be.true
    expect(resultWrongMessageTestnet).to.be.false
    expect(resultWrongAddressTestnet).to.be.false
  })

  it('Can verify legacy BIP-137 signature from P2PKH', () => {
    // Random address that should fail validation
    const p2pkhMainnetInvalid = '1F3sAm6ZtwLAUnj7d38pGFxtP3RVEvtsbV'
    const p2pkhMainnetValidResult = Verifier.verifySignature(addresses.liquid.p2pkh, message, expectedSignature)
    const p2pkhMainnetInvalidResult = Verifier.verifySignature(p2pkhMainnetInvalid, message, expectedSignature)

    expect(p2pkhMainnetValidResult).to.be.true
    expect(p2pkhMainnetInvalidResult).to.be.false
  })
  it('Can verify legacy BIP-137 signature from P2PKH (testnet)', () => {
    // Random address that should fail validation
    const p2pkhTestnetInvalid = 'muZpTpBYhxmRFuCjLc7C6BBDF32C8XVJUi'
    const p2pkhTestnetValidResult = Verifier.verifySignature(addresses.testnet.p2pkh, message, expectedSignature)
    const p2pkhTestnetInvalidResult = Verifier.verifySignature(p2pkhTestnetInvalid, message, expectedSignature)

    expect(p2pkhTestnetValidResult).to.be.true
    expect(p2pkhTestnetInvalidResult).to.be.false
  })

  it('Can verify legacy BIP-137 signature from P2WPKH', () => {
    const p2wpkhMainnetValidResult = Verifier.verifySignature(addresses.liquid.p2wpkh, message, expectedSignature)
    const p2wpkhMainnetInvalidResult = Verifier.verifySignature(p2wpkhMainnetInvalid, message, expectedSignature)

    expect(p2wpkhMainnetValidResult).to.be.true
    expect(p2wpkhMainnetInvalidResult).to.be.false
  })

  it('Can verify legacy BIP-137 signature from P2WPKH (testnet)', () => {
    const p2wpkhTestnetValidResult = Verifier.verifySignature(addresses.testnet.p2wpkh, message, expectedSignature)
    const p2wpkhTestnetInvalidResult = Verifier.verifySignature(p2wpkhTestnetInvalid, message, expectedSignature)

    expect(p2wpkhTestnetValidResult).to.be.true
    expect(p2wpkhTestnetInvalidResult).to.be.false
  })
  it('Can invalidate addresses', () => {
    const invalidAddress = 'bc1apv609nr0vr25u07u95waq5lucwfm6tde4nydujnu8npg4q75mr5sxq8lt3'
    const invalidAddressResult = Verifier.verifySignature(invalidAddress, message, expectedSignature)

    expect(invalidAddressResult).to.be.false
  })

  it('Can invalidate addresses (testnet)', () => {
    const invalidAddressTestnet = 'tb1a000273lqsqqfw2a6h2vqxr2tll4wgtv7zu8a30rz4mhree8q5jzq8cjtyp'
    const invalidAddressTestnetResult = Verifier.verifySignature(invalidAddressTestnet, message, expectedSignature)

    expect(invalidAddressTestnetResult).to.be.false
  })

  it('Can verify and falsify BIP-322 signature for P2WPKH address', () => {
    // Test vectors listed at https://github.com/bitcoin/bips/blob/master/bip-0322.mediawiki#user-content-Test_vectors
    const addressWrong = 'ex1qmh0un07z5gmv69yg687wglhgj2mscysh2sw6k2'

    // Correct addresses and correct signature
    const resultEmptyValid = Verifier.verifySignature(addresses.liquid.p2wpkh, messageEmpty, expectedSignatureEmptyAlt)
    const resultHelloWorldValid = Verifier.verifySignature(addresses.liquid.p2wpkh, message, expectedSignatureAlt)

    // Correct addresses but incorrect signature
    const resultHelloWorldInvalidSig = Verifier.verifySignature(addresses.liquid.p2wpkh, messageEmpty, expectedSignatureAlt)
    const resultEmptyInvalidSig = Verifier.verifySignature(addresses.liquid.p2wpkh, message, expectedSignatureEmptyAlt)

    // Incorrect addresses
    const resultEmptyInvalidAddress = Verifier.verifySignature(addressWrong, messageEmpty, expectedSignatureEmptyAlt)
    const resultHelloWorldInvalidAddress = Verifier.verifySignature(addressWrong, message, expectedSignatureAlt)

    expect(resultEmptyValid).to.be.true
    expect(resultHelloWorldValid).to.be.true
    expect(resultHelloWorldInvalidSig).to.be.false
    expect(resultEmptyInvalidSig).to.be.false
    expect(resultEmptyInvalidAddress).to.be.false
    expect(resultHelloWorldInvalidAddress).to.be.false
  })
  it('Can verify and falsify BIP-322 signature for P2WPKH address (testnet)', () => {
    const addressWrongTestnet = 'tex1qfcjnukn8u7mwz0n7cxy5fjv5zpj57m8muv8093'

    // Correct addresses and correct signature
    const resultEmptyValidTestnet = Verifier.verifySignature(addresses.testnet.p2wpkh, messageEmpty, expectedSignatureEmptyAlt)
    const resultHelloWorldValidTestnet = Verifier.verifySignature(addresses.testnet.p2wpkh, message, expectedSignatureAlt)

    // Correct addresses but incorrect signature
    const resultHelloWorldInvalidSigTestnet = Verifier.verifySignature(addresses.testnet.p2wpkh, messageEmpty, expectedSignatureAlt)
    const resultEmptyInvalidSigTestnet = Verifier.verifySignature(addresses.testnet.p2wpkh, message, expectedSignatureEmptyAlt)

    // Incorrect addresses
    const resultEmptyInvalidAddressTestnet = Verifier.verifySignature(addressWrongTestnet, messageEmpty, expectedSignatureEmptyAlt)
    const resultHelloWorldInvalidAddressTestnet = Verifier.verifySignature(addressWrongTestnet, message, expectedSignatureAlt)

    expect(resultEmptyValidTestnet).to.be.true
    expect(resultHelloWorldValidTestnet).to.be.true
    expect(resultHelloWorldInvalidSigTestnet).to.be.false
    expect(resultEmptyInvalidSigTestnet).to.be.false
    expect(resultEmptyInvalidAddressTestnet).to.be.false
    expect(resultHelloWorldInvalidAddressTestnet).to.be.false
  })

  it('Can verify and falsify BIP-322 signature for P2SH address', () => {
    const addressWrong = 'H36FU3csPfSEZj2RyEDkmsgBWSwgDcLBAR'

    // Correct addresses and correct signature
    const resultHelloWorldValid = Verifier.verifySignature(addresses.liquid.p2sh, message, expectedSignature)
    const resultEmptyValid = Verifier.verifySignature(addresses.liquid.p2sh, messageEmpty, expectedSignatureEmpty)

    // Correct addresses but incorrect signature
    const resultHelloWorldInvalidSig = Verifier.verifySignature(addresses.liquid.p2sh, messageEmpty, expectedSignature)
    const resultEmptyInvalidSig = Verifier.verifySignature(addresses.liquid.p2sh, message, expectedSignatureEmpty)

    // Incorrect addresses
    const resultHelloWorldInvalidAddress = Verifier.verifySignature(addressWrong, message, expectedSignature)
    const resultEmptyInvalidAddress = Verifier.verifySignature(addressWrong, messageEmpty, expectedSignatureEmpty)

    expect(resultHelloWorldValid).to.be.true
    expect(resultEmptyValid).to.be.true
    expect(resultHelloWorldInvalidSig).to.be.false
    expect(resultEmptyInvalidSig).to.be.false
    expect(resultEmptyInvalidAddress).to.be.false
    expect(resultHelloWorldInvalidAddress).to.be.false
  })
  it('Can verify and falsify BIP-322 signature for P2SH address (testnet)', () => {
    const addressWrongTestnet = '8ms2towULZV7XoUxwFs7uwwESgQnjHB3Yx'

    // Correct addresses and correct signature
    const resultHelloWorldValidTestnet = Verifier.verifySignature(addresses.testnet.p2sh, message, expectedSignature)
    const resultEmptyValidTestnet = Verifier.verifySignature(addresses.testnet.p2sh, messageEmpty, expectedSignatureEmpty)

    // Correct addresses but incorrect signature
    const resultHelloWorldInvalidSigTestnet = Verifier.verifySignature(addresses.testnet.p2sh, messageEmpty, expectedSignature)
    const resultEmptyInvalidSigTestnet = Verifier.verifySignature(addresses.testnet.p2sh, message, expectedSignatureEmpty)

    // Incorrect addresses
    const resultHelloWorldInvalidAddressTestnet = Verifier.verifySignature(addressWrongTestnet, message, expectedSignature)
    const resultEmptyInvalidAddressTestnet = Verifier.verifySignature(addressWrongTestnet, messageEmpty, expectedSignatureEmpty)

    expect(resultHelloWorldValidTestnet).to.be.true
    expect(resultEmptyValidTestnet).to.be.true
    expect(resultHelloWorldInvalidSigTestnet).to.be.false
    expect(resultEmptyInvalidSigTestnet).to.be.false
    expect(resultEmptyInvalidAddressTestnet).to.be.false
    expect(resultHelloWorldInvalidAddressTestnet).to.be.false
  })


  it('Reject verification from malformed address', () => {
    const malformP2PKH = addresses.liquid.p2pkh + 'M'
    const malformedP2WPKH = addresses.liquid.p2wpkh + 'm'

    const resultP2PKH = Verifier.verifySignature.bind(Verifier, malformP2PKH, message, expectedSignature)
    const resultP2WPKH = Verifier.verifySignature.bind(Verifier, malformedP2WPKH, message, expectedSignature)

    expect(resultP2PKH).to.throw() // Throw by bitcoinjs-message library
    expect(resultP2WPKH).to.throws() // Throw by helper/Address
  })
})
