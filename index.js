const keytar = require('keytar')

async function saveCredentials(serviceName, username, password) {
    let credentials = await keytar.findCredentials(serviceName)
    if (!credentials.length) {
        await keytar.setPassword(serviceName, username, password)
    }
}

async function deleteCredentials(serviceName, username) {
    await keytar.deletePassword(serviceName, username)
}

async function testing() {
    await saveCredentials('KeytarTest', 'name', '1234')
    await saveCredentials('KeytarTest', 'name2', '123fsdfsdfsdfsdfsdd4sdfdsfsdfsd')
    console.log('All saving')
    await deleteCredentials('KeytarTest', 'name2')
    console.log('Deleted')
}

testing()
