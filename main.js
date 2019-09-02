const protocol = require('./src/ipc-protocol');

module.exports = {
    getIpc: function (clientPort, serverPort, hostname = '127.0.0.1') {
        return protocol.createProtocol(clientPort, serverPort, hostname);
    }
}