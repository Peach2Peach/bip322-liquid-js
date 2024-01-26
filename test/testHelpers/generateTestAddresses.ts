import ecc from '@bitcoinerlab/secp256k1'
import ECPairFactory from 'ecpair'
import { networks, payments } from 'liquidjs-lib'
import { privateKey, privateKeyTestnet } from './testVectors'

export const ECPair = ECPairFactory(ecc)

export const generateAddresses = (privKey: string, network: networks.Network) => {
  const signer = ECPair.fromWIF(privKey, network)
  const blindkey = ECPair.fromWIF(privKey, network).publicKey
  const addresses: Record<string, string> = {
    p2wpkh: payments.p2wpkh({ pubkey: signer.publicKey, network }).address,
    p2pkh: payments.p2pkh({
      pubkey: signer.publicKey,
      network,
    }).address,
    p2wsh: payments.p2wsh({
      redeem: payments.p2wpkh({ pubkey: signer.publicKey, network }),
      network,
    }).address,
    p2sh: payments.p2sh({
      redeem: payments.p2wpkh({ pubkey: signer.publicKey, network }),
      network,
    }).address,
  }

  addresses.p2wpkhConfidential = payments.p2wpkh({
    address: addresses.p2wpkh, blindkey, network,
  }).address
  addresses.p2pkhConfidential = payments.p2pkh({
    address: addresses.p2pkh, blindkey, network,
  }).address

  return addresses
}

export const generateTestAddresses = () => ({
  liquid: generateAddresses(privateKey, networks.liquid),
  testnet: generateAddresses(privateKeyTestnet, networks.testnet),
  regtest: generateAddresses(privateKeyTestnet, networks.regtest),
})
