const main = require('./main');
var crypto = require('crypto');

var key = Buffer.from('75a901d3e0b319194ec3c2993653256d0f91ee46d2693d1db1c5f75ed9b70f18','hex');
var iv = Buffer.from('da592eb6f5dc954b0a796cf3d0aae690','hex');

main.encrypt((plainText) => {
    var cipher = crypto.createCipheriv('aes256', key, iv);
    var crypted = cipher.update(plainText, 'utf8', 'base64');
    crypted += cipher.final('base64');
    
    return crypted;
}, (encryptedText) => {
    var decipher = crypto.createDecipheriv('aes256', key, iv);
    var uncrypted = decipher.update(encryptedText, 'base64', 'utf8');
    uncrypted += decipher.final('utf8');
 
    return uncrypted;
}); 

var protocol = main.getIpc(8022, 8021);

protocol.listen((a, head) => {
    console.log('Received: ' + a);

    main.send({
        Command: 'node-callback',
        Payload: null
    }, (err) => {
        console.error(err);
    }, head)
});

protocol.send({
    Command: 'node-test',
    Payload: null
}, (err) => {
    console.error(err);
});