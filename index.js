var express = require('express');
var http = require('http');
var morgan = require('morgan');

var app = express();

var port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));
app.use(morgan());

app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});

app.listen(port);
console.log('Server now listening on port ' + port);