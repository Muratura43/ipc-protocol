const ipcServer = require('./ipc-server');
const ipcClient = require('./ipc-client');

module.exports = {
  listen: function (onDataCallback) {
    ipcServer.start(onDataCallback);
  },
  close: function () {
    ipcServer.end();
  },
  send: function (data, onError) {
    ipcClient.send(JSON.stringify(data), onError);
  }
}
