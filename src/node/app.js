var express = require('express');
var path = require('path');
var parser = require('body-parser');

var port = process.env.PORT || 8080;

global.MOVIES = [
  {},
  {},
  {}
]

var app = express();

app.use(express.static(path.resolve('/src/static')));
app.use(express.static(path.resolve('/src/dist')));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.listen(port);

console.log('App listening on port ' + port);

var api = require('./routes.js');
app.use((res, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  next();
});

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve('/src/dist/index.html'));
});
