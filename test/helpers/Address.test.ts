// Import dependencies
import ecc from '@bitcoinerlab/secp256k1'
import { expect, use } from 'chai'
import chaibytes from 'chai-bytes'
import ECPairFactory from 'ecpair'

// Import module to be tested
import { networks } from 'bitcoinjs-lib'
import { Address } from '../../src'

describe('Address Test', () => {

  before(() => {
    use(chaibytes)
  })
  describe('Address Recognition Functions', () => {

    // Arrange
    // P2PKH
    const p2pkhMainnet = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem'
    const p2pkhTestnet = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn'
    const p2pkhTestnetII = 'n11112Lo13n4GvQhQpDtLY8KH7KNeCVmvw'
    // P2SH
    const p2shMainnet = '3EktnHQD7RiAE6uzMj2ZifT9YgRrkSgzQX'
    const p2shTestnet = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc'
    // P2WPKH
    const p2wpkhMainnet = 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4'
    const p2wpkhTestnet = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx'
    // P2WSH
    const p2wshMainnet = 'bc1qeklep85ntjz4605drds6aww9u0qr46qzrv5xswd35uhjuj8ahfcqgf6hak'
    const p2wshTestnet = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7'
    // P2TR
    const p2trMainnet = 'bc1p000022222333333444444455555555666666666999999999zz9qzagays'
    const p2trTestnet = 'tb1p000273lqsqqfw2a6h2vqxr2tll4wgtv7zu8a30rz4mhree8q5jzq8cjtyp'

    it('Classify if a given address is a P2PKH address correctly', () => {
      // Act
      const p2pkhMainnetResult = Address.isP2PKH(p2pkhMainnet)
      const p2pkhTestnetResult = Address.isP2PKH(p2pkhTestnet)
      const p2pkhTestnetIIResult = Address.isP2PKH(p2pkhTestnetII)
      const p2shMainnetResult = Address.isP2PKH(p2shMainnet)
      const p2shTestnetResult = Address.isP2PKH(p2shTestnet)
      const p2wpkhMainnetResult = Address.isP2PKH(p2wpkhMainnet)
      const p2wpkhTestnetResult = Address.isP2PKH(p2wpkhTestnet)
      const p2wshMainnetResult = Address.isP2PKH(p2wshMainnet)
      const p2wshTestnetResult = Address.isP2PKH(p2wshTestnet)
      const p2trMainnetResult = Address.isP2PKH(p2trMainnet)
      const p2trTestnetResult = Address.isP2PKH(p2trTestnet)

      // Assert
      expect(p2pkhMainnetResult).to.be.true
      expect(p2pkhTestnetResult).to.be.true
      expect(p2pkhTestnetIIResult).to.be.true
      expect(p2shMainnetResult).to.be.false
      expect(p2shTestnetResult).to.be.false
      expect(p2wpkhMainnetResult).to.be.false
      expect(p2wpkhTestnetResult).to.be.false
      expect(p2wshMainnetResult).to.be.false
      expect(p2wshTestnetResult).to.be.false
      expect(p2trMainnetResult).to.be.false
      expect(p2trTestnetResult).to.be.false
    })
    it('Classify if a given address is a P2SH address correctly', () => {
      // Act
      const p2pkhMainnetResult = Address.isP2SH(p2pkhMainnet)
      const p2pkhTestnetResult = Address.isP2SH(p2pkhTestnet)
      const p2pkhTestnetIIResult = Address.isP2SH(p2pkhTestnetII)
      const p2shMainnetResult = Address.isP2SH(p2shMainnet)
      const p2shTestnetResult = Address.isP2SH(p2shTestnet)
      const p2wpkhMainnetResult = Address.isP2SH(p2wpkhMainnet)
      const p2wpkhTestnetResult = Address.isP2SH(p2wpkhTestnet)
      const p2wshMainnetResult = Address.isP2SH(p2wshMainnet)
      const p2wshTestnetResult = Address.isP2SH(p2wshTestnet)
      const p2trMainnetResult = Address.isP2SH(p2trMainnet)
      const p2trTestnetResult = Address.isP2SH(p2trTestnet)

      // Assert
      expect(p2pkhMainnetResult).to.be.false
      expect(p2pkhTestnetResult).to.be.false
      expect(p2pkhTestnetIIResult).to.be.false
      expect(p2shMainnetResult).to.be.true
      expect(p2shTestnetResult).to.be.true
      expect(p2wpkhMainnetResult).to.be.false
      expect(p2wpkhTestnetResult).to.be.false
      expect(p2wshMainnetResult).to.be.false
      expect(p2wshTestnetResult).to.be.false
      expect(p2trMainnetResult).to.be.false
      expect(p2trTestnetResult).to.be.false
    })
    it('Classify if a given address is a P2WPKH address correctly', () => {
      // Act
      const p2pkhMainnetResult = Address.isP2WPKH(p2pkhMainnet)
      const p2pkhTestnetResult = Address.isP2WPKH(p2pkhTestnet)
      const p2pkhTestnetIIResult = Address.isP2WPKH(p2pkhTestnetII)
      const p2shMainnetResult = Address.isP2WPKH(p2shMainnet)
      const p2shTestnetResult = Address.isP2WPKH(p2shTestnet)
      const p2wpkhMainnetResult = Address.isP2WPKH(p2wpkhMainnet)
      const p2wpkhTestnetResult = Address.isP2WPKH(p2wpkhTestnet)
      const p2wshMainnetResult = Address.isP2WPKH(p2wshMainnet)
      const p2wshTestnetResult = Address.isP2WPKH(p2wshTestnet)
      const p2trMainnetResult = Address.isP2WPKH(p2trMainnet)
      const p2trTestnetResult = Address.isP2WPKH(p2trTestnet)

      // Assert
      expect(p2pkhMainnetResult).to.be.false
      expect(p2pkhTestnetResult).to.be.false
      expect(p2pkhTestnetIIResult).to.be.false
      expect(p2shMainnetResult).to.be.false
      expect(p2shTestnetResult).to.be.false
      expect(p2wpkhMainnetResult).to.be.true
      expect(p2wpkhTestnetResult).to.be.true
      expect(p2wshMainnetResult).to.be.false
      expect(p2wshTestnetResult).to.be.false
      expect(p2trMainnetResult).to.be.false
      expect(p2trTestnetResult).to.be.false
    })
    it('Classify if a given address is a P2TR address correctly', () => {
      // Act
      const p2pkhMainnetResult = Address.isP2TR(p2pkhMainnet)
      const p2pkhTestnetResult = Address.isP2TR(p2pkhTestnet)
      const p2pkhTestnetIIResult = Address.isP2TR(p2pkhTestnetII)
      const p2shMainnetResult = Address.isP2TR(p2shMainnet)
      const p2shTestnetResult = Address.isP2TR(p2shTestnet)
      const p2wpkhMainnetResult = Address.isP2TR(p2wpkhMainnet)
      const p2wpkhTestnetResult = Address.isP2TR(p2wpkhTestnet)
      const p2wshMainnetResult = Address.isP2TR(p2wshMainnet)
      const p2wshTestnetResult = Address.isP2TR(p2wshTestnet)
      const p2trMainnetResult = Address.isP2TR(p2trMainnet)
      const p2trTestnetResult = Address.isP2TR(p2trTestnet)

      // Assert
      expect(p2pkhMainnetResult).to.be.false
      expect(p2pkhTestnetResult).to.be.false
      expect(p2pkhTestnetIIResult).to.be.false
      expect(p2shMainnetResult).to.be.false
      expect(p2shTestnetResult).to.be.false
      expect(p2wpkhMainnetResult).to.be.false
      expect(p2wpkhTestnetResult).to.be.false
      expect(p2wshMainnetResult).to.be.false
      expect(p2wshTestnetResult).to.be.false
      expect(p2trMainnetResult).to.be.true
      expect(p2trTestnetResult).to.be.true
    })

  })

  describe('Witness Stack Recognition Functions', () => {

    // Arrange
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
    // Taken from transaction 8f7805b9f578729ae8432e9711268fcbcfa02671e58ec143e40448e87281a5a0
    const witnessSingleKeyP2TR = [
      Buffer.from('f49ad81e2e586e5ad101da9c00d59fdd7397833329e5a2c5b819fb864a1f25529044df246ed045c76bbbcc39ab6739f75e17d6f85722737e20c145f9aa96338e', 'hex'),
    ]
    // Taken from transaction d1042c9db36af59586e5681feeace356e85599a8fc0000cc50e263186a9c2276
    const witnessScriptP2TR = [
      Buffer.from('187d52d4ed44698ecc962ed74d7f822820475a7567c15bbad8f91ce96d0f132d2d13e43079ae700119c91a46208c995e3a18b5366368dd04450c3ff565221d2c', 'hex'),
      Buffer.from('205de8154e70d6af52906a4c4d7898b0180de5db8b7cd44cbd27cddff7751cebc7ac0063036f7264010118746578742f706c61696e3b636861727365743d7574662d38002a7b2270223a22736e73222c226f70223a22726567222c226e616d65223a2236333132382e73617473227d68', 'hex'),
      Buffer.from('c05de8154e70d6af52906a4c4d7898b0180de5db8b7cd44cbd27cddff7751cebc7', 'hex'),
    ]
    it('Classify P2WPKH witness stack correctly', () => {
      // Act
      const witnessP2WPKHResult = Address.isP2WPKHWitness(witnessP2WPKH)
      const witnessP2WSHResult = Address.isP2WPKHWitness(witnessP2WSH)
      const witnessSingleKeyP2TRResult = Address.isP2WPKHWitness(witnessSingleKeyP2TR)
      const witnessScriptP2TRResult = Address.isP2WPKHWitness(witnessScriptP2TR)

      // Assert
      expect(witnessP2WPKHResult).to.be.true
      expect(witnessP2WSHResult).to.be.false
      expect(witnessSingleKeyP2TRResult).to.be.false
      expect(witnessScriptP2TRResult).to.be.false
    })
    it('Classify single-key-spend P2TR witness stack correctly', () => {
      // Act
      const witnessP2WPKHResult = Address.isSingleKeyP2TRWitness(witnessP2WPKH)
      const witnessP2WSHResult = Address.isSingleKeyP2TRWitness(witnessP2WSH)
      const witnessSingleKeyP2TRResult = Address.isSingleKeyP2TRWitness(witnessSingleKeyP2TR)
      const witnessScriptP2TRResult = Address.isSingleKeyP2TRWitness(witnessScriptP2TR)

      // Assert
      expect(witnessP2WPKHResult).to.be.false
      expect(witnessP2WSHResult).to.be.false
      expect(witnessSingleKeyP2TRResult).to.be.true
      expect(witnessScriptP2TRResult).to.be.false
    })

  })

  describe('Address to scriptPubKey Function', () => {

    // Arrange
    // P2PKH
    const p2pkhMainnet = '17VZNX1SN5NtKa8UQFxwQbFeFc3iqRYhem'
    const p2pkhMainnetScriptPubKey = Buffer.from('76a91447376c6f537d62177a2c41c4ca9b45829ab9908388ac', 'hex')
    const p2pkhTestnet = 'mipcBbFg9gMiCh81Kj8tqqdgoZub1ZJRfn'
    const p2pkhTestnetScriptPubKey = Buffer.from('76a914243f1394f44554f4ce3fd68649c19adc483ce92488ac', 'hex')
    const p2pkhTestnetII = 'n11112Lo13n4GvQhQpDtLY8KH7KNeCVmvw'
    const p2pkhTestnetIIScriptPubKey = Buffer.from('76a914d5b84bc628a0a9fd15a411480198d5a31d1e5c0b88ac', 'hex')
    // P2SH
    const p2shMainnet = '3EktnHQD7RiAE6uzMj2ZifT9YgRrkSgzQX'
    const p2shMainnetScriptPubKey = Buffer.from('a9148f55563b9a19f321c211e9b9f38cdf686ea0784587', 'hex')
    const p2shTestnet = '2MzQwSSnBHWHqSAqtTVQ6v47XtaisrJa1Vc'
    const p2shTestnetScriptPubKey = Buffer.from('a9144e9f39ca4688ff102128ea4ccda34105324305b087', 'hex')
    // P2WPKH
    const p2wpkhMainnet = 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4'
    const p2wpkhMainnetScriptPubKey = Buffer.from('0014751e76e8199196d454941c45d1b3a323f1433bd6', 'hex')
    const p2wpkhTestnet = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx'
    const p2wpkhTestnetScriptPubKey = Buffer.from('0014751e76e8199196d454941c45d1b3a323f1433bd6', 'hex')
    // P2WSH
    const p2wshMainnet = 'bc1qeklep85ntjz4605drds6aww9u0qr46qzrv5xswd35uhjuj8ahfcqgf6hak'
    const p2wshMainnetScriptPubKey = Buffer.from('0020cdbf909e935c855d3e8d1b61aeb9c5e3c03ae8021b286839b1a72f2e48fdba70', 'hex')
    const p2wshTestnet = 'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7'
    const p2wshTestnetScriptPubKey = Buffer.from('00201863143c14c5166804bd19203356da136c985678cd4d27a1b8c6329604903262', 'hex')
    // P2TR
    const p2trMainnet = 'bc1p000022222333333444444455555555666666666999999999zz9qzagays'
    const p2trMainnetScriptPubKey = Buffer.from('51207bdef5294a546318c635ad6b5ad694a5294a535ad6b5ad6b45294a5294a5108a', 'hex')
    const p2trTestnet = 'tb1p000273lqsqqfw2a6h2vqxr2tll4wgtv7zu8a30rz4mhree8q5jzq8cjtyp'
    const p2trTestnetScriptPubKey = Buffer.from('51207bdeaf47e08000972bbaba98030d4bffeae42d9e170fd8bc62aeee3ce4e0a484', 'hex')

    it('Convert valid Bitcoin address into correct scriptPubKey', () => {
      // Act
      const p2pkhMainnetConverted = Address.convertAdressToScriptPubkey(p2pkhMainnet)
      const p2pkhTestnetConverted = Address.convertAdressToScriptPubkey(p2pkhTestnet)
      const p2pkhTestnetIIConverted = Address.convertAdressToScriptPubkey(p2pkhTestnetII)
      const p2shMainnetConverted = Address.convertAdressToScriptPubkey(p2shMainnet)
      const p2shTestnetConverted = Address.convertAdressToScriptPubkey(p2shTestnet)
      const p2wpkhMainnetConverted = Address.convertAdressToScriptPubkey(p2wpkhMainnet)
      const p2wpkhTestnetConverted = Address.convertAdressToScriptPubkey(p2wpkhTestnet)
      const p2wshMainnetConverted = Address.convertAdressToScriptPubkey(p2wshMainnet)
      const p2wshTestnetConverted = Address.convertAdressToScriptPubkey(p2wshTestnet)
      const p2trMainnetConverted = Address.convertAdressToScriptPubkey(p2trMainnet)
      const p2trTestnetConverted = Address.convertAdressToScriptPubkey(p2trTestnet)

      // Assert
      expect(p2pkhMainnetConverted).to.equalBytes(p2pkhMainnetScriptPubKey)
      expect(p2pkhTestnetConverted).to.equalBytes(p2pkhTestnetScriptPubKey)
      expect(p2pkhTestnetIIConverted).to.equalBytes(p2pkhTestnetIIScriptPubKey)
      expect(p2shMainnetConverted).to.equalBytes(p2shMainnetScriptPubKey)
      expect(p2shTestnetConverted).to.equalBytes(p2shTestnetScriptPubKey)
      expect(p2wpkhMainnetConverted).to.equalBytes(p2wpkhMainnetScriptPubKey)
      expect(p2wpkhTestnetConverted).to.equalBytes(p2wpkhTestnetScriptPubKey)
      expect(p2wshMainnetConverted).to.equalBytes(p2wshMainnetScriptPubKey)
      expect(p2wshTestnetConverted).to.equalBytes(p2wshTestnetScriptPubKey)
      expect(p2trMainnetConverted).to.equalBytes(p2trMainnetScriptPubKey)
      expect(p2trTestnetConverted).to.equalBytes(p2trTestnetScriptPubKey)
    })
    it('Throw when handling invalid address', () => {
      // Arrange
      const p2pkhMainnetMalformed = p2pkhMainnet + 'm'
      const p2pkhTestnetMalformed = p2pkhTestnet + 'm'
      const p2shMainnetMalformed = p2shMainnet + 'm'
      const p2shTestnetMalformed = p2shTestnet + 'm'
      const p2wpkhMainnetMalformed = p2wpkhMainnet + 'm'
      const p2wpkhTestnetMalformed = p2wpkhTestnet + 'm'
      const p2wshMainnetMalformed = p2wshMainnet + 'm'
      const p2wshTestnetMalformed = p2wshTestnet + 'm'
      const p2trMainnetMalformed = p2trMainnet + 'm'
      const p2trTestnetMalformed = p2trTestnet + 'm'
      const p2wtfMalformed = 'bc1wtfpv609nr0vr25u07u95waq5lucwfm6tde4nydujnu8npg4q75mr5sxq8lt3'

      // Act
      const p2pkhMainnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2pkhMainnetMalformed)
      const p2pkhTestnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2pkhTestnetMalformed)
      const p2shMainnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2shMainnetMalformed)
      const p2shTestnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2shTestnetMalformed)
      const p2wpkhMainnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2wpkhMainnetMalformed)
      const p2wpkhTestnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2wpkhTestnetMalformed)
      const p2wshMainnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2wshMainnetMalformed)
      const p2wshTestnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2wshTestnetMalformed)
      const p2trMainnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2trMainnetMalformed)
      const p2trTestnetMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2trTestnetMalformed)
      const p2wtfMalformedResult = Address.convertAdressToScriptPubkey.bind(Address, p2wtfMalformed)

      // Assert
      expect(p2pkhMainnetMalformedResult).to.throw() // Throw by bitcoinjs-message library
      expect(p2pkhTestnetMalformedResult).to.throw() // Throw by bitcoinjs-message library
      expect(p2shMainnetMalformedResult).to.throw() // Throw by bitcoinjs-message library
      expect(p2shTestnetMalformedResult).to.throw() // Throw by bitcoinjs-message library
      expect(p2wpkhMainnetMalformedResult).to.throws('Unknown address type')
      expect(p2wpkhTestnetMalformedResult).to.throws('Unknown address type')
      expect(p2wshMainnetMalformedResult).to.throws('Unknown address type')
      expect(p2wshTestnetMalformedResult).to.throws('Unknown address type')
      expect(p2trMainnetMalformedResult).to.throws('Unknown address type')
      expect(p2trTestnetMalformedResult).to.throws('Unknown address type')
      expect(p2wtfMalformedResult).to.throws('Unknown address type')
    })

  })

  describe('Public Key to Addres Function', () => {

    it('Convert valid public key into correct Bitcoin address', () => {
      // Arrange
      // Extract public key from private key
      const privateKey = 'L3VFeEujGtevx9w18HD1fhRbCH67Az2dpCymeRE1SoPK6XQtaN2k'
      const ECPair = ECPairFactory(ecc)
      const signer = ECPair.fromWIF(privateKey)
      const { publicKey } = signer
      // Expected address for the private key L3VFeEujGtevx9w18HD1fhRbCH67Az2dpCymeRE1SoPK6XQtaN2k
      const p2pkhAddress = '14vV3aCHBeStb5bkenkNHbe2YAFinYdXgc'
      const p2pkhAddressTestnet = 'mjSSLdHFzft9NC5NNMik7WrMQ9rRhMhNpT'
      const p2shAddress = '37qyp7jQAzqb2rCBpMvVtLDuuzKAUCVnJb'
      const p2shAddressTestnet = '2MyQBsrfRnTLwEdpjVVYNWHDB8LXLJUcub9'
      const p2wpkhAddress = 'bc1q9vza2e8x573nczrlzms0wvx3gsqjx7vavgkx0l'
      const p2wpkhAddressTestnet = 'tb1q9vza2e8x573nczrlzms0wvx3gsqjx7vaxwd45v'
      const p2trAddress = 'bc1ppv609nr0vr25u07u95waq5lucwfm6tde4nydujnu8npg4q75mr5sxq8lt3'
      const p2trAddressTestnet = 'tb1ppv609nr0vr25u07u95waq5lucwfm6tde4nydujnu8npg4q75mr5s3g3s37'

      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2pkh')).to.equal(p2pkhAddress)
      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2pkh', networks.testnet)).to.equal(p2pkhAddressTestnet)
      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2sh-p2wpkh')).to.equal(p2shAddress)
      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2sh-p2wpkh', networks.testnet)).to.equal(p2shAddressTestnet)
      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2wpkh')).to.equal(p2wpkhAddress)
      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2wpkh', networks.testnet)).to.equal(p2wpkhAddressTestnet)
      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2tr')).to.equal(p2trAddress)
      expect(Address.convertPubKeyIntoAddress(publicKey, 'p2tr', networks.testnet)).to.equal(p2trAddressTestnet)
      expect(Address.convertPubKeyIntoAddress(publicKey.subarray(1, 33), 'p2tr')).to.equal(p2trAddress)
      expect(Address.convertPubKeyIntoAddress(publicKey.subarray(1, 33), 'p2tr', networks.testnet)).to.equal(p2trAddressTestnet)
    })
    it('Throw when handling invalid address type', () => {
      // Arrange
      // Extract public key from private key
      const privateKey = 'L3VFeEujGtevx9w18HD1fhRbCH67Az2dpCymeRE1SoPK6XQtaN2k'
      const ECPair = ECPairFactory(ecc)
      const signer = ECPair.fromWIF(privateKey)
      const { publicKey } = signer

      // Act
      // @ts-ignore
      const p2wtfAddress = Address.convertPubKeyIntoAddress.bind(publicKey, 'p2wtf')

      // Assert
      expect(p2wtfAddress).to.throws('Cannot convert public key into unsupported address type.')
    })

  })

})
