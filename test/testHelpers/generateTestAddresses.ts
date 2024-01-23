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
})

// {
//   p2wpkh: 'ex1qmh0un07z5gmv69yg687wglhgj2mscysh2sw6k2',
//   p2pkh: 'QHVYYerCaH8zAXgKnw5H3YXQ3RgcCXmh8f',
//   p2wsh: 'ex1qc0a5g32xyjm85el94l3pfsjngu887786t9m6pv5stdrzmpm6nr0stjup5x',
//   p2sh: 'H36FU3csPfSEZj2RyEDkmsgBWSwgDcLBAR',
//   p2wpkhConfidential: 'ex1qmh0un07z5gmv69yg687wglhgj2mscysh2sw6k2',
//   p2pkhConfidential: 'QHVYYerCaH8zAXgKnw5H3YXQ3RgcCXmh8f'
// }


// {
//   p2wpkh: 'tex1qfcjnukn8u7mwz0n7cxy5fjv5zpj57m8muv8093',
//   p2pkh: 'FcHumbpUerNFJHsDdDejoqvk8kDjxqx3TB',
//   p2wsh: 'tex1qf6gjuuu3ys47juscesy76dw6w9at4stla50tthasnfu3vzny2hqqfyq9gm',
//   p2sh: '8ms2towULZV7XoUxwFs7uwwESgQnjHB3Yx',
//   p2wpkhConfidential: 'tex1qfcjnukn8u7mwz0n7cxy5fjv5zpj57m8muv8093',
//   p2pkhConfidential: 'FcHumbpUerNFJHsDdDejoqvk8kDjxqx3TB'
// }

