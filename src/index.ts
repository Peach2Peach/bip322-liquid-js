import ecc from '@bitcoinerlab/secp256k1'
import * as bitcoin from 'bitcoinjs-lib'
import BIP322 from './BIP322'
import Signer from './Signer'
import Verifier from './Verifier'
import { Address, BIP137, Witness } from './helpers'
bitcoin.initEccLib(ecc)

export { Address, BIP137, BIP322, Signer, Verifier, Witness }
