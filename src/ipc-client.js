const net = require('net');
const uuidv1 = require('uuid/v1');

exports.IpcClient = IpcClient;

exports.createClient = function(port, hostname) {
  return new IpcClient(port, hostname);
};

function IpcClient(port, hostname) {
  this.settings = {
    hostname: hostname,
    port: port
  };
}

IpcClient.prototype.send = function (data, onError) {
  var client = net.connect({
    host: this.settings.hostname,
    port: this.settings.port
  }, _ => {
    console.log('Connected to server.');

    var request = {
      Header: {
        CallbackId: uuidv1(),
        Port: this.settings.port
      },
      Entity: data
    };
    var srequest = JSON.stringify(request);

    // Calculate the buffer size
    var bufferSize = lpad(srequest.length, 4);
    // Send the buffer size to the server
    client.write(bufferSize, 'utf8', _ => {
      // Send the actual data to the server
      client.write(srequest, 'utf8');
    });
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
