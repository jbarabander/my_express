var http = require('http');
var Router = require('./router');
var sq = require('speed-query');
function Application () {
  this._router = new Router();
}

Application.prototype.get = function () {
  this._router.get.apply(this._router, arguments);
}

Application.prototype.post = function () {
  this._router.post.apply(this._router, arguments);
}

Application.prototype.use = function () {
  this._router.use.apply(this._router, arguments);
}

Application.prototype.handle = function (req, res) {
  var queryStr = req.url.split('?')[1];
  req.query = queryStr ? sq.serialize(queryStr) : {};
  this._router.handle.apply(this._router, arguments);
}

Application.prototype.listen = function (port, cb) {
  var portToUse = typeof port === 'number' ? port : 3000;
  var self = this;
  var handler = function (req, res) {
    return self.handle(req, res);
  }
  var server = http.createServer(handler);
  return server.listen(portToUse, cb);
}

module.exports = Application;
