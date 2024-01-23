import { expect, use } from 'chai'
import chaibytes from 'chai-bytes'
import { networks } from 'liquidjs-lib'
import { Address } from '../../src'
import { ECPair } from '../testHelpers/generateTestAddresses'
import { privateKey } from '../testHelpers/testVectors'

// P2PKH
const p2pkhMainnet = 'QHVYYerCaH8zAXgKnw5H3YXQ3RgcCXmh8f'
const p2pkhTestnet = 'FcHumbpUerNFJHsDdDejoqvk8kDjxqx3TB'
const p2pkhMainnetScriptPubKey = Buffer.from('76a914dddfc9bfc2a236cd1488d1fce47ee892b70c121788ac', 'hex')
const p2pkhTestnetScriptPubKey = Buffer.from('76a9144e253e5a67e7b6e13e7ec18944c99410654f6cfb88ac', 'hex')
// P2SH
const p2shMainnet = 'H36FU3csPfSEZj2RyEDkmsgBWSwgDcLBAR'
const p2shTestnet = '8ms2towULZV7XoUxwFs7uwwESgQnjHB3Yx'
const p2shMainnetScriptPubKey = Buffer.from('a914da632273acf72eece78f5a40a3684b407253831c87', 'hex')
const p2shTestnetScriptPubKey = Buffer.from('a914519efb305701c774f7ce59322496e9dd5df72ecd87', 'hex')
// P2WPKH
const p2wpkhMainnet = 'ex1qmh0un07z5gmv69yg687wglhgj2mscysh2sw6k2'
const p2wpkhTestnet = 'tex1qfcjnukn8u7mwz0n7cxy5fjv5zpj57m8muv8093'
const p2wpkhMainnetScriptPubKey = Buffer.from('0014dddfc9bfc2a236cd1488d1fce47ee892b70c1217', 'hex')
const p2wpkhTestnetScriptPubKey = Buffer.from('00144e253e5a67e7b6e13e7ec18944c99410654f6cfb', 'hex')
// P2WSH
const p2wshMainnet = 'ex1qc0a5g32xyjm85el94l3pfsjngu887786t9m6pv5stdrzmpm6nr0stjup5x'
const p2wshTestnet = 'tex1qf6gjuuu3ys47juscesy76dw6w9at4stla50tthasnfu3vzny2hqqfyq9gm'
const p2wshMainnetScriptPubKey = Buffer.from(
  '0020c3fb44454624b67a67e5afe214c253470e7f78fa5977a0b2905b462d877a98df', 'hex',
)
const p2wshTestnetScriptPubKey = Buffer.from(
  '00204e912e7391242be97218cc09ed35da717abac17fed1eb5dfb09a79160a6455c0', 'hex',
)


describe('Address Test', () => {

  before(() => {
    use(chaibytes)
  })
  describe('Address Recognition Functions', () => {


    it('Classify if a given address is a P2PKH address correctly', () => {
      const p2pkhMainnetResult = Address.isP2PKH(p2pkhMainnet)
      const p2pkhTestnetResult = Address.isP2PKH(p2pkhTestnet)
      const p2shMainnetResult = Address.isP2PKH(p2shMainnet)
      const p2shTestnetResult = Address.isP2PKH(p2shTestnet)
      const p2wpkhMainnetResult = Address.isP2PKH(p2wpkhMainnet)
      const p2wpkhTestnetResult = Address.isP2PKH(p2wpkhTestnet)
      const p2wshMainnetResult = Address.isP2PKH(p2wshMainnet)
      const p2wshTestnetResult = Address.isP2PKH(p2wshTestnet)

      expect(p2pkhMainnetResult).to.be.true
      expect(p2pkhTestnetResult).to.be.true
      expect(p2shMainnetResult).to.be.false
      expect(p2shTestnetResult).to.be.false
      expect(p2wpkhMainnetResult).to.be.false
      expect(p2wpkhTestnetResult).to.be.false
      expect(p2wshMainnetResult).to.be.false
      expect(p2wshTestnetResult).to.be.false
    })
    it('Classify if a given address is a P2SH address correctly', () => {
      const p2pkhMainnetResult = Address.isP2SH(p2pkhMainnet)
      const p2pkhTestnetResult = Address.isP2SH(p2pkhTestnet)
      const p2shMainnetResult = Address.isP2SH(p2shMainnet)
      const p2shTestnetResult = Address.isP2SH(p2shTestnet)
      const p2wpkhMainnetResult = Address.isP2SH(p2wpkhMainnet)
      const p2wpkhTestnetResult = Address.isP2SH(p2wpkhTestnet)
      const p2wshMainnetResult = Address.isP2SH(p2wshMainnet)
      const p2wshTestnetResult = Address.isP2SH(p2wshTestnet)

      expect(p2pkhMainnetResult).to.be.false
      expect(p2pkhTestnetResult).to.be.false
      expect(p2shMainnetResult).to.be.true
      expect(p2shTestnetResult).to.be.true
      expect(p2wpkhMainnetResult).to.be.false
      expect(p2wpkhTestnetResult).to.be.false
      expect(p2wshMainnetResult).to.be.false
      expect(p2wshTestnetResult).to.be.false
    })
    it('Classify if a given address is a P2WPKH address correctly', () => {
      const p2pkhMainnetResult = Address.isP2WPKH(p2pkhMainnet)
      const p2pkhTestnetResult = Address.isP2WPKH(p2pkhTestnet)
      const p2shMainnetResult = Address.isP2WPKH(p2shMainnet)
      const p2shTestnetResult = Address.isP2WPKH(p2shTestnet)
      const p2wpkhMainnetResult = Address.isP2WPKH(p2wpkhMainnet)
      const p2wpkhTestnetResult = Address.isP2WPKH(p2wpkhTestnet)
      const p2wshMainnetResult = Address.isP2WPKH(p2wshMainnet)
      const p2wshTestnetResult = Address.isP2WPKH(p2wshTestnet)

      expect(p2pkhMainnetResult).to.be.false
      expect(p2pkhTestnetResult).to.be.false
      expect(p2shMainnetResult).to.be.false
      expect(p2shTestnetResult).to.be.false
      expect(p2wpkhMainnetResult).to.be.true
      expect(p2wpkhTestnetResult).to.be.true
      expect(p2wshMainnetResult).to.be.false
      expect(p2wshTestnetResult).to.be.false
    })
  })

  describe('Witness Stack Recognition Functions', () => {
    // Taken from transaction 0b1941022852684d36650aff93740a4c8a0e70520f59128fa8edb23417ea7529
    const witnessP2WPKH = [
      Buffer.from('3045022100a611fcb4be51f4866e0386f44fdd83498735dd5ff37aa447ffc6243834804d1502202cf5cda352a887e0b02642492471268ecd9cb1e4ac489d047bf92838e14aaece01', 'hex'),
      Buffer.from('03d673188f8bafafc9b2819eb007901c3aef025a8fa8f74e2510f0a6c12221011c', 'hex'),
    ]
    // Taken from transaction 4221ff28411a87e6d412458689c471b875dd43aca7d02c7fb7c7331855581434
    const witnessP2WSH = [
      Buffer.from('3045022100c931f9c01fe6f4e4f67c55644764659289d8d4cc723fe82dd2b97fbfda064bec02200dfd586f58c9edba874e0cef66e9fe91e7aa7a6cddd6a1f572efb66fe9caef2e01', 'hex'),
      Buffer.from('210279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798ac', 'hex'),
    ]


    it('Classify P2WPKH witness stack correctly', () => {
      const witnessP2WPKHResult = Address.isP2WPKHWitness(witnessP2WPKH)
      const witnessP2WSHResult = Address.isP2WPKHWitness(witnessP2WSH)

      expect(witnessP2WPKHResult).to.be.true
      expect(witnessP2WSHResult).to.be.false
    })
    it('Classify single-key-spend P2TR witness stack correctly', () => {
      const witnessP2WPKHResult = Address.isSingleKeyP2TRWitness(witnessP2WPKH)
      const witnessP2WSHResult = Address.isSingleKeyP2TRWitness(witnessP2WSH)

      expect(witnessP2WPKHResult).to.be.false
      expect(witnessP2WSHResult).to.be.false
    })

  })

  describe('Address to scriptPubKey Function', () => {


    it('Convert valid Bitcoin address into correct scriptPubKey', () => {
      const p2pkhMainnetConverted = Address.convertAdressToScriptPubkey(p2pkhMainnet)
      const p2pkhTestnetConverted = Address.convertAdressToScriptPubkey(p2pkhTestnet)
      const p2shMainnetConverted = Address.convertAdressToScriptPubkey(p2shMainnet)
      const p2shTestnetConverted = Address.convertAdressToScriptPubkey(p2shTestnet)
      const p2wpkhMainnetConverted = Address.convertAdressToScriptPubkey(p2wpkhMainnet)
      const p2wpkhTestnetConverted = Address.convertAdressToScriptPubkey(p2wpkhTestnet)
      const p2wshMainnetConverted = Address.convertAdressToScriptPubkey(p2wshMainnet)
      const p2wshTestnetConverted = Address.convertAdressToScriptPubkey(p2wshTestnet)

      expect(p2pkhMainnetConverted).to.equalBytes(p2pkhMainnetScriptPubKey)
      expect(p2pkhTestnetConverted).to.equalBytes(p2pkhTestnetScriptPubKey)
      expect(p2shMainnetConverted).to.equalBytes(p2shMainnetScriptPubKey)
      expect(p2shTestnetConverted).to.equalBytes(p2shTestnetScriptPubKey)
      expect(p2wpkhMainnetConverted).to.equalBytes(p2wpkhMainnetScriptPubKey)
      expect(p2wpkhTestnetConverted).to.equalBytes(p2wpkhTestnetScriptPubKey)
      expect(p2wshMainnetConverted).to.equalBytes(p2wshMainnetScriptPubKey)
      expect(p2wshTestnetConverted).to.equalBytes(p2wshTestnetScriptPubKey)
    })
    it('Throw when handling invalid address', () => {
      const p2pkhMainnetMalformed = p2pkhMainnet + 'm'
      const p2pkhTestnetMalformed = p2pkhTestnet + 'm'
      const p2shMainnetMalformed = p2shMainnet + 'm'
      const p2shTestnetMalformed = p2shTestnet + 'm'
      const p2wpkhMainnetMalformed = p2wpkhMainnet + 'm'
      const p2wpkhTestnetMalformed = p2wpkhTestnet + 'm'
      const p2wshMainnetMalformed = p2wshMainnet + 'm'
      const p2wshTestnetMalformed = p2wshTestnet + 'm'
      const p2wtfMalformed = 'bc1wtfpv609nr0vr25u07u95waq5lucwfm6tde4nydujnu8npg4q75mr5sxq8lt3'

      const p2pkhMainnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2pkhMainnetMalformed)
      const p2pkhTestnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2pkhTestnetMalformed)
      const p2shMainnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2shMainnetMalformed)
      const p2shTestnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2shTestnetMalformed)
      const p2wpkhMainnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2wpkhMainnetMalformed)
      const p2wpkhTestnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2wpkhTestnetMalformed)
      const p2wshMainnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2wshMainnetMalformed)
      const p2wshTestnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2wshTestnetMalformed)
      const p2wtfMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2wtfMalformed)

      expect(p2pkhMainnetMalformedResult).to.throw() // Throw by bitcoinjs-message library
      expect(p2pkhTestnetMalformedResult).to.throw() // Throw by bitcoinjs-message library
      expect(p2shMainnetMalformedResult).to.throw() // Throw by bitcoinjs-message library
      expect(p2shTestnetMalformedResult).to.throw() // Throw by bitcoinjs-message library
      expect(p2wpkhMainnetMalformedResult).to.throws('Invalid checksum for ' + p2wpkhMainnetMalformed)
      expect(p2wpkhTestnetMalformedResult).to.throws('Invalid checksum for ' + p2wpkhTestnetMalformed)
      expect(p2wshMainnetMalformedResult).to.throws('Invalid checksum for ' + p2wshMainnetMalformed)
      expect(p2wshTestnetMalformedResult).to.throws('Invalid checksum for ' + p2wshTestnetMalformed)
      expect(p2wtfMalformedResult).to.throws('Unknown address type')
    })

  })

  describe('Public Key to Addres Function', () => {

    it('Convert valid public key into correct Bitcoin address', () => {
      // Extract public key from private key
      const signer = ECPair.fromWIF(privateKey)
      const { publicKey } = signer
      // Expected address for the private key L3VFeEujGtevx9w18HD1fhRbCH67Az2dpCymeRE1SoPK6XQtaN2k
      const p2pkhAddress = 'Q1BsAmBhevrqCnYh3hjXvk9sQuwVG5SxwG'
      const p2pkhAddressTestnet = 'FZ6CVUvek98S2gcsXtjqk7SMCKXgM3CgTN'
      const p2shAddress = 'GoLVHosCK8bNqaw8edFLNbUfK95EhQPYZ7'
      const p2shAddressTestnet = '8kaRbduS7XKrUv9QAEaxg62vj3vNRkgMzK'
      const p2wpkhAddress = 'ex1q9vza2e8x573nczrlzms0wvx3gsqjx7vaxpt7zl'
      const p2wpkhAddressTestnet = 'tex1q9vza2e8x573nczrlzms0wvx3gsqjx7vau8eh75'

      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2pkh')).to.equal(p2pkhAddress)
      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2pkh', networks.testnet)).to.equal(p2pkhAddressTestnet)
      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2sh-p2wpkh')).to.equal(p2shAddress)
      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2sh-p2wpkh', networks.testnet)).to.equal(p2shAddressTestnet)
      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2wpkh')).to.equal(p2wpkhAddress)
      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2wpkh', networks.testnet)).to.equal(p2wpkhAddressTestnet)
    })
    it('Throw when handling invalid address type', () => {
      const { publicKey } = ECPair.fromWIF(privateKey)

      // @ts-ignore
      const p2wtfAddress = Address.convertPubKeyIntoAddress.bind(publicKey, 'p2wtf')

      expect(p2wtfAddress).to.throws('Cannot convert public key into unsupported address type.')
    })

  })

})
