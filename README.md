# ipc-protocol
Provides simple interprocess communication, through TCP.

## Installation
Using npm:
```
npm install ipc-protocol
```

In Node.js:
```
// Import the ipc-protocol and return an instance of the client/server
const ipcProtocol = require('ipc-protocol').getIpc(constants.clientPort, constants.serverPort, '127.0.0.1');

// A send example:
ipcProtocol.send({
    Command: 'command',
    Payload: null
}, (err) => {
    console.error(err);
});

// A listen example:
main.listen((a, head) => {
    console.log('Received: ' + a);

    // Sending a callback with the same headers
    main.send({
        Command: 'node-callback',
        Payload: null
    }, (err) => {
        console.error(err);
    }, head)
});
```

## Note:
This solution integrates perfectly with the .NET Core solution [IpcProtocol.Core](https://github.com/Muratura43/IpcProtocol.Core)
