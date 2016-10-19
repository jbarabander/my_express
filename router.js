var EventEmitter = require('events');
var constants = require('./constants');
function Router () {
  this.middleware = [];
}

Router.prototype.post = function (path, cb) {
  var pathAndHandlerObj = pickPathAndHandler(path, cb);
  var entryToRegister = {
    path: pathAndHandlerObj.path,
    handler: pathAndHandlerObj.handler,
    method: constants.POST
  }
  this.middleware.push(entryToRegister);
}

Router.prototype.get = function (path, cb) {
  var pathAndHandlerObj = pickPathAndHandler(path, cb);
  var entryToRegister = {
    path: pathAndHandlerObj.path,
    handler: pathAndHandlerObj.handler,
    method: constants.GET
  };
  this.middleware.push(entryToRegister);
}

Router.prototype.handle = function (req, res) {
  var pathToFind = req.url;
  var methodToFind = req.method;
  for (var i = 0; i < this.middleware.length; i++) {
    var currentMethod = this.middleware[i].method;
    var currentPath = this.middleware[i].path;
    var currentHandler = this.middleware[i].handler;
    if (pathToFind === currentPath) {
       if (methodToFind === currentMethod) {
         return currentHandler(req, res);
       } else if (currentMethod === constants.USE) {
         if (currentHandler instanceof Router) {
           currentHandler.handle(req, res);
         }
       }
    }
  }
}

Router.prototype.use = function (path, cb) {
  var pathAndHandlerObj = pickPathAndHandler(path, cb, true);
  var entryToRegister = {
    path: pathAndHandlerObj.path,
    handler: pathAndHandlerObj.handler,
    method: constants.USE
  }
}

function pickPathAndHandler (path, cb, allowRouter) {
  var pathToRegister = typeof path === 'string' && path ? path : '/';
  var handlerToRegister;
  if (typeof path === 'function' || (allowRouter && path instanceof Router)) {
    handlerToRegister = path
  } else if (typeof cb === 'function' || (allowRouter && cb instanceof Router)) {
    handlerToRegister = cb;
  } else {
    throw new TypeError('middleware handler must be a function');
  }
  return {
    path: pathToRegister,
    handler: handlerToRegister
  }
}

module.exports = Router;
