const net = require("net");

exports.IpcServer = IpcServer;

exports.createServer = function(port, hostname) {
  return new IpcServer(port, hostname);
};

function IpcServer(port, hostname) {
  this.settings = {
    hostname: hostname,
    port: port
  };
}

IpcServer.prototype.start = function(onDataCallback) {
  this.server = net.createServer(stream => {
    console.log("Client connected.");

    stream.on("data", data => {
      // Send the data back to the caller
      onDataCallback(data.toString("utf8"));
    });

    stream.on("end", _ => {
      console.log("Client disconnected.");
    });
  });

  // Start listening for clients
  this.server.listen(this.settings.port, this.settings.hostname);

  this.server.on("close", _ => {
    console.log("Server closing.");
  });

  this.server.on("error", e => {
    console.error(e);
  });

  this.server.on("listening", function() {
    console.log("Server is listening.");
  });
};

IpcServer.prototype.end = function() {
  if (this.server !== undefined && this.server !== null) {
    this.server.close();
    this.server = null;
  }
};
