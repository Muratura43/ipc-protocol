const ipcServer = require('./ipc-server');
const ipcClient = require('./ipc-client');

exports.IpcProtocol = IpcProtocol;

exports.createProtocol = function(clientPort, serverPort, hostname) {
  return new IpcProtocol(clientPort, serverPort, hostname);
}

function IpcProtocol(clientPort, serverPort, hostname) {
  this.settings = {
    hostname: hostname,
    clientPort: clientPort,
    serverPort: serverPort
  };

  this.client = ipcClient.createClient(this.settings.clientPort, this.settings.hostname);
  this.server = ipcServer.createServer(this.settings.serverPort, this.settings.hostname);
};

IpcProtocol.prototype.listen = function (onDataCallback) {
  this.server.start(onDataCallback);
};

IpcProtocol.prototype.send = function (data, onError) {
  this.client.send(JSON.stringify(data), onError);
};

IpcProtocol.prototype.close = function () {
  this.server.end();
};
