
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var device = require('express-device');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
// app.use(express.bodyParser());
app.use(device.capture());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  socket.on('next', function (data) {
    console.log('next', data);
    // socket.emit('next');
    io.sockets.emit('next');
  });
  socket.on('previous', function (data) {
    console.log('previous', data);
    // socket.emit('next');
    io.sockets.emit('previous');
  });
});
