// var http = require('http');
// var stream = require('stream');
// var server = http.createServer();
// var internalHandlers = [];
// server.on('request', function (req, res) {
//   var routeHandler = chooseRouteHandler(req.url, req.method);
//   if (routeHandler) {
//     routeHandler(req, res);
//   } else {
//     res.end();
//   }
// })
//
// server.listen(1337, function () {
//   console.log('Listening on port 1337');
// });
//
// function get (path, cb) {
//   internalHandlers.push({
//     method: 'GET',
//     handler: cb,
//     path: path
//   })
// }
//
// function post (path, cb) {
//   internalHandlers.push({
//     method: 'POST',
//     handler: function (req, res) {
//       var body = []
//       req
//       .on('data', function (chunk) {
//         body.push(chunk);
//       })
//       .on('end', function () {
//         if (req.headers['content-type'] === 'application/json') {
//           req.body = JSON.parse(Buffer.concat(body).toString());
//           cb(req, res);
//         }
//     })
//   },
//     path: path
//   })
// }
//
// get('/', function (req, res) {
//   res.write('IN THE INDEX!');
//   res.end();
// });
// get('/hi', function (req, res) {
//   res.write('hi');
//   res.end();
// });
//
// post('/', function (req, res) {
//   console.log(req.body);
//   res.end();
// });
//
// function chooseRouteHandler (path, method) {
//   for (var i = 0; i < internalHandlers.length; i++) {
//     var route = internalHandlers[i]
//     if (route.method === method && route.path === path) {
//       return route.handler
//     }
//   }
// }
var Application = require('./application');
var app = new Application();
app._router.get('/', function (req, res) {
  res.write('IN THE INDEX!');
  res.end();
});

app.listen(1337, function () {
  console.log('Server listening on port 1337');
});
