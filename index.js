var Application = require('./application');
var Router = require('./router');
var app = new Application();
var subRouter = new Router();

subRouter.get('/hello', function (req, res) {
  res.write('IN HELLO!');
  res.end();
});

app._router.get('/', function (req, res) {
  res.write('IN THE INDEX!');
  res.end();
});

app._router.use('/hello', subRouter);

app.listen(1337, function () {
  console.log('Server listening on port 1337');
});
