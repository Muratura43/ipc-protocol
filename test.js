const main = require('./main').getIpc(8022, 8021);

main.listen((a, head) => {
    console.log('Received: ' + a);

    main.send({
        Command: 'node-callback',
        Payload: null
    }, (err) => {
        console.error(err);
    }, head)
});

main.send({
    Command: 'node-test',
    Payload: null
}, (err) => {
    console.error(err);
});