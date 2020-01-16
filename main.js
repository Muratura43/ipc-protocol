const protocol = require("./src/ipc-protocol");

module.exports = {
    getIpc: function (clientPort, serverPort, hostname = "127.0.0.1") {
        var prot = protocol.createProtocol(clientPort, serverPort, hostname);

        if (this.encryptMethod) {
            prot.encrypt(this.encryptMethod);
        }

        if (this.decryptMethod) {
            prot.decrypt(this.decryptMethod);
        }

        prot.init();
        return prot;
    },

    encrypt: function (encryptMethod, decryptMethod) {
        this.encryptMethod = encryptMethod;
        this.decryptMethod = decryptMethod;
    }
};
