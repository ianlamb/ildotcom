// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var compression    = require('compression');

// configuration ===========================================
	
// config files
var db = require('./config/db');
var config = require('./config/app.js');

var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

app.set('jwtTokenSecret', config.jwtTokenSecret);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// server routes ==================================================
var router = express.Router();
var routes = require('./app/routes');
routes(app, router, jwt);

// start app ===============================================
app.listen(port);	
// console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
