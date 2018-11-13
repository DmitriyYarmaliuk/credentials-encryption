// Keytar notes:

// getPassword(service, account)
// Get the stored password for the service and account.

// service - The string service name.

// account - The string account name.

// Returns the string password or null on failures.

// addPassword(service, account, password)
// Add the password for the service and account to the keychain.

// service - The string service name.

// account - The string account name.

// password - The string password.

// Returns true on success, false on failure.

// deletePassword(service, account)
// Delete the stored password for the service and account.

// service - The string service name.

// account - The string account name.

// Returns the string password or null on failures.

// replacePassword(service, account, password)
// Replace the password for the service and account in the keychain.

// This is a simple convenience function that internally calls deletePassword(service, account) followed by addPassword(service, account, password).

// service - The string service name.

// account - The string account name.

// password - The string password.

// Returns true on success, false on failure.

// findPassword(service)
// Find the first password for the service in the keychain.

// service - The string service name.

// Returns the string password or null on failures.
const keytar = require('keytar')

// Part of https://github.com/chris-rock/node-crypto-examples
// Nodejs encryption with CTR

let crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text) {
    let cipher = crypto.createCipher(algorithm, password)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    let decipher = crypto.createDecipher(algorithm, password)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

let encryptedPassword = encrypt('admin12345')
let decryptedPassword

async function encryptDecryptPassword(passwordToEncryptDecrypt) {
    let result = await keytar.getPassword('KeytarTest', 'ServiceUsername')
    if (!result) {
        console.log('setting the password')
        await keytar.setPassword('KeytarTest', 'ServiceUsername', passwordToEncryptDecrypt)
    }
    result = await keytar.getPassword('KeytarTest', 'ServiceUsername')
    decryptedPassword = decrypt(result)
    return decryptedPassword
}

encryptDecryptPassword(encryptedPassword)
    .then((result) => {
        decryptedPassword = result
        console.log('encryptedPassword:', encryptedPassword)
        console.log('decryptedPassword:', decryptedPassword)

    })


// TODO: Fix Warning: Use Cipheriv for counter mode of aes-256-ctr
