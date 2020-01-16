const net = require('net');
const uuidv1 = require('uuid/v1');

exports.IpcClient = IpcClient;

exports.createClient = function (port, hostname, encrypt = null) {
  return new IpcClient(port, hostname, encrypt);
};

function IpcClient(port, hostname, encrypt = null) {
  this.settings = {
    hostname: hostname,
    port: port
  };
  this.encrypt = encrypt;
}

IpcClient.prototype.send = function (data, onError, headers = null) {
  var client = net.connect({
    host: this.settings.hostname,
    port: this.settings.port
  }, _ => {
    console.log('Connected to server.');

    var head = {
      CallbackId: uuidv1(),
      Port: this.settings.port
    };

    if (headers) {
      head = headers;
    }

    var request = {
      Header: head,
      Entity: data
    };
    var srequest = JSON.stringify(request);
    
    if (this.encrypt) {
      srequest = this.encrypt(srequest);
    }

    // Calculate the buffer size
    var bufferSize = lpad(srequest.length, 4);

    // Send the message to the server
    client.write(bufferSize + srequest, 'utf8');
  });

  client.on("error", e => {
    console.error(e);

    if (onError) {
      onError(e);
    }
  });

  client.on("end", _ => {
    console.log("Disconnected from server.");
  });
};

function lpad(value, padding) {
  var zeroes = new Array(padding + 1).join("0");
  return (zeroes + value).slice(-padding);
}
