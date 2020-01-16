const ipcServer = require("./ipc-server");
const ipcClient = require("./ipc-client");

exports.IpcProtocol = IpcProtocol;

exports.createProtocol = function (clientPort, serverPort, hostname) {
  return new IpcProtocol(clientPort, serverPort, hostname);
};

function IpcProtocol(clientPort, serverPort, hostname) {
  this.settings = {
    hostname: hostname,
    clientPort: clientPort,
    serverPort: serverPort
  };

  this.client = ipcClient.createClient(
    this.settings.clientPort,
    this.settings.hostname,
    this.encryptMethod 
  );
  this.server = ipcServer.createServer(
    this.settings.serverPort,
    this.settings.hostname,
    this.decryptMethod
  );
}

IpcProtocol.prototype.listen = function (onDataCallback) {
  this.server.start(onDataCallback);
};

IpcProtocol.prototype.send = function (data, onError, callbackHeaders = null) {
  this.client.send(data, onError, callbackHeaders);
};

IpcProtocol.prototype.close = function () {
  this.server.end();
};

IpcProtocol.prototype.encrypt = function(encryptMethod) {
  this.encryptMethod = encryptMethod;
}

IpcProtocol.prototype.decrypt = function(decryptMethod) {
  this.decryptMethod = decryptMethod;
}