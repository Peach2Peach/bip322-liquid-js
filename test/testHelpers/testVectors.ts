/* eslint-disable max-len */

// Test vector listed at
// https://github.com/bitcoin/bitcoin/blob/29b28d07fa958b89e1c7916fda5d8654474cf495/src/test/util_tests.cpp#L2747
// https://github.com/bitcoin/bips/blob/master/bip-0322.mediawiki#user-content-Test_vectors
export const message = 'Hello World'
export const expectedSignature = 'IOW2xi+ebJLeBtr674l4QH76dqDoVjLV80R9EFKFQX5rBrlCXPIZaYs8Yuayg0ZqjyiCbLy9pzZIS7JWT65/nsU='
export const expectedSignatureAlt = 'AkgwRQIhAOzyynlqt93lOKJr+wmmxIens//zPzl9tqIOua93wO6MAiBi5n5EyAcPScOjf1lAqIUIQtr3zKNeavYabHyR8eGhowEhAsfxIAMZZEKUPYWI4BruhAQjzFT8FSFSajuFwrDL1Yhy'

export const messageEmpty = ''
export const expectedSignatureEmpty = 'H0Gm/ylcjvGmj29D/r6ASHKKWAyGA/MEU/Eh+IhFw3ZxFxy9b/dJ8/XFsiutCV8DWlFGnO95m/KoZwFPJTF1qaM='
export const expectedSignatureEmptyAlt = 'AkcwRAIgM2gBAQqvZX15ZiysmKmQpDrG83avLIT492QBzLnQIxYCIBaTpOaD20qRlEylyxFSeEA2ba9YOixpX8z46TSDtS40ASECx/EgAxlkQpQ9hYjgGu6EBCPMVPwVIVJqO4XCsMvViHI='

export const privateKey = 'L3VFeEujGtevx9w18HD1fhRbCH67Az2dpCymeRE1SoPK6XQtaN2k'

// Equivalent to L3VFeEujGtevx9w18HD1fhRbCH67Az2dpCymeRE1SoPK6XQtaN2k
export const privateKeyTestnet = 'cTrF79uahxMC7bQGWh2931vepWPWqS8KtF8EkqgWwv3KMGZNJ2yP'
