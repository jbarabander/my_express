var http = require('http');
var Router = require('./router');
var sq = require('speed-query');
function Application () {
  this._router = new Router();
  this.server;
}

Application.prototype.listen = function (port, cb) {
  var portToUse = typeof port === 'number' ? port : 3000;
  var self = this;
  this.server = http.createServer();
  this.server.on('request', function (req, res) {
    var queryStr = req.url.split('?')[1];
    req.query = queryStr ? sq.serialize(queryStr) : {};
    self._router.handle(req, res);
  });
  return this.server.listen(portToUse, cb);
}

module.exports = Application;
