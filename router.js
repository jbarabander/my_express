var EventEmitter = require('events');

function Router () {
  this.middleware = [];
}

Router.prototype.post = function (path, cb) {
  var pathToRegister = typeof path === 'string' && path ? path : '/';
  var hanlderToRegister;
  if (typeof path === 'function') {
    handlerToRegister = path
  } else if (typeof cb === 'function') {
    handlerToRegister = cb;
  } else {
    throw new TypeError('middleware handler must be a function');
  }
  var entryToRegister = {
    path: pathToRegister,
    handler: handlerToRegister,
    method: 'POST'
  }
  this.middleware.push(entryToRegister);
}

Router.prototype.get = function (path, cb) {
  var pathToRegister = typeof path === 'string' && path ? path : '/';
  var hanlderToRegister;
  if (typeof path === 'function') {
    handlerToRegister = path
  } else if (typeof cb === 'function') {
    handlerToRegister = cb;
  } else {
    throw new TypeError('middleware handler must be a function');
  }
  var entryToRegister = {
    path: pathToRegister,
    handler: handlerToRegister,
    method: 'POST'
  }
  this.middleware.push(entryToRegister);
}

Router.prototype.handle = function (req, res) {
  var pathToFind = req.url;
  var methodToFind = req.method;
  for (var i = 0; i < this.middleware.length; i++) {
    var currentMiddleware = this.middleware[i];
    if (pathToFind === currentMiddleware.path) {
      return currentMiddleware.handler(req, res);
    }
  }
}
module.exports = Router;
