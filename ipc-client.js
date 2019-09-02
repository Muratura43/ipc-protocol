const net = require('net');

const hostname = '127.0.0.1';
const portNumber = 55123;

module.exports = {
  send: function (data, onError) {
    var client = net.connect({
      host: hostname,
      port: portNumber
    }, _ => {
      console.log('Connected to server.');

      // Calculate the buffer size
      var bufferSize = lpad(data.length, 4);
      // Send the buffer size to the server
      client.write(bufferSize, 'utf8', _ => {
        // Send the actual data to the server
        client.write(data, 'utf8');
      });
    });

    client.on('error', (e) => {
      console.error(e);

      if (onError) {
        onError(e);
      }
    });

    client.on('end', _ => {
      console.log('Disconnected from server.');
    });
  }
}

function lpad(value, padding) {
  var zeroes = new Array(padding + 1).join("0");
  return (zeroes + value).slice(-padding);
}
