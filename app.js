var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose    = require('mongoose');
var cors = require('cors');

var config = require('./config')

var auth = require('./routes/Auth');
var api = require('./routes/Api');
var block = require('./routes/Block');
var admin = require('./routes/Admin');
var mwXAccessToken = require('./middlewares/xAccessToken');
var mwWebSocket = require('./middlewares/WebSocket');
var mwCheckAdmin = require('./middlewares/checkAdminRole');

var app = express();
app.use(mwWebSocket.Listen);

app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization,x-access-token");
  if(req.method === 'OPTIONS') return res.end();
  next();
});

mongoose.connect(config.default_connect_string);
var dbMongo = mongoose.connection;
dbMongo.on('err', console.error.bind(console, 'connect fail'));
dbMongo.once('open',function () {
    console.log('mongo connected');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', auth);
app.use('/api', mwXAccessToken, api);
app.use('/block', mwXAccessToken, mwCheckAdmin.isAdmin, block);
app.use('/admin', mwXAccessToken, mwCheckAdmin.isAdmin, admin);
// app.use('/api', mwXAccessToken());

app.use(mwWebSocket.Listen);

module.exports = app;

