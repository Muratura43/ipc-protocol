const net = require("net");

exports.IpcServer = IpcServer;

exports.createServer = function (port, hostname, decrypt = null) {
  return new IpcServer(port, hostname, decrypt);
};

function IpcServer(port, hostname, decrypt = null) {
  this.settings = {
    hostname: hostname,
    port: port
  };
  this.decrypt = decrypt;
}

IpcServer.prototype.start = function (onDataCallback) {
  this.server = net.createServer(stream => {
    console.log("Client connected.");

    stream.on('data', async (data) => {
      try {
        var sdata = data.toString('base64');
        sdata = sdata.substring(4, sdata.length);
        
        if (this.decrypt) {
          sdata = await this.decrypt(sdata);
        }

        var request = JSON.parse(sdata);
        var headers = request.Header;
        var entity = request.Entity;

        if (entity) {
          // Send the data back to the caller
          onDataCallback(JSON.stringify(entity), headers);
        }
      } catch (ex) {
        console.error(ex);
      }
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

  this.server.on("listening", function () {
    console.log("Server is listening.");
  });
};

IpcServer.prototype.end = function () {
  if (this.server !== undefined && this.server !== null) {
    this.server.close();
    this.server = null;
  }
};
