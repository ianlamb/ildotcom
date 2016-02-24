/* global process, __dirname */

var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var compression    = require('compression');

var db = require('./config/db');
var config = require('./config/app.js');
var Environment = require('./config/environment.js');
var env = new Environment();
var port = process.env.PORT || env.port || 8080;

mongoose.connect(db.url);

app.set('jwtTokenSecret', config.jwtTokenSecret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + env.assetsRoot));

app.use(compression());

var router = express.Router();
var routes = require('./app/routes')(app, router);

app.listen(port, function() {	
	console.log('Magic happens on port ' + port);
});

exports = module.exports = app;