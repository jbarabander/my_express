var Application = require('./application');
var app = new Application();
console.log(app);
app._router.get('/', function (req, res) {
  res.write('IN THE INDEX!');
  res.end();
});

app.listen(1337, function () {
  console.log('Server listening on port 1337');
});
