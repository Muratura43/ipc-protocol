const net = require('net');

const hostname = '127.0.0.1';
const portNumber = 55124;
var server;

module.exports = {
  start: function (onDataCallback) {
    server = net.createServer((stream) => {
      console.log('Client connected.');

      stream.on('data', (data) => {
        // Send the data back to the caller
        onDataCallback(data.toString('utf8'));
      });

      stream.on('end', _ => {
        console.log('Client disconnected.');
      });
    });

    // Start listening for clients
    server.listen(portNumber, hostname);

    server.on('close', _ => {
      console.log('Server closing.');
    });

    server.on('error', (e) => {
      console.error(e);
    });

    server.on('listening', function () {
      console.log('Server is listening.');
    });
  },
  end: function () {
    if (server !== undefined && server !== null) {
      server.close();
      server = null;
    }
  }
}
