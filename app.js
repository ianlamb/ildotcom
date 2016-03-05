var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var compression    = require('compression');

// expose the app path to require
require('app-module-path').addPath(__dirname + '/app');

var logger = require('logger');

// load configs
var db = require('config/db');
var config = require('config/app.js');
var env = require('config/environment.js');
logger.info('Environment: ', env);

process.env.PORT = process.env.PORT || env.port || 8080;

mongoose.connect(db.url);

app.set('jwtTokenSecret', config.jwtTokenSecret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + env.assetsRoot));
app.use(compression());

var router = express.Router();
var routes = require('routes')(app, router);

module.exports = app;