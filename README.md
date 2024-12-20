# BIP322-JS

![Unit Test Status](https://github.com/Peach2Peach/bip322-liquid-js/actions/workflows/unit_test.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/Peach2Peach/bip322-liquid-js/badge.svg?branch=main)](https://coveralls.io/github/Peach2Peach/bip322-liquid-js?branch=main)

A Javascript library that provides utility functions related to the BIP-322 signature scheme for liquid.

## Limitations

Only P2WPKH, P2PKH are supported so far in this library.

## Supported Features

1. Generate raw toSpend and toSign BIP-322 transactions
2. Sign a BIP-322 signature using a private key
3. Verify a simple BIP-322 signature

## Example

```js
// Import modules that are useful to you
const { BIP322, Signer, Verifier } = require('bip322-js');

// Signing a BIP-322 signature with a private key
const privateKey = 'L3VFeEujGtevx9w18HD1fhRbCH67Az2dpCymeRE1SoPK6XQtaN2k';
const address = 'ex1q9vza2e8x573nczrlzms0wvx3gsqjx7vaxpt7zl';
const message = 'Hello World';
const signature = Signer.sign(privateKey, address, message);
console.log(signature);

// Verifying a simple BIP-322 signature
const validity = Verifier.verifySignature(address, message, signature);
console.log(validity); // True

// You can also get the raw unsigned BIP-322 toSpend and toSign transaction directly
const scriptPubKey = Buffer.from('00142b05d564e6a7a33c087f16e0f730d1440123799d', 'hex');
const toSpend = BIP322.buildToSpendTx(message, scriptPubKey); // bitcoin.Transaction
const toSpendTxId = toSpend.getId();
const toSign = BIP322.buildToSignTx(toSpendTxId, scriptPubKey); // bitcoin.Psbt
// Do whatever you want to do with the PSBT
```

More working examples can be found within the unit test for BIP322, Signer, and Verifier.