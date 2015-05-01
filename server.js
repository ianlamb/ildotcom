// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var multer         = require('multer');
var methodOverride = require('method-override');
var compression    = require('compression');

// configuration ===========================================
	
// config files
var db = require('./config/db');
var config = require('./config/app.js');
var Environment = require('./config/environment.js');
var env = new Environment();

var port = process.env.PORT || env.port || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

app.set('jwtTokenSecret', config.jwtTokenSecret);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + env.assetsRoot));
console.log('Static Contents Dir: ' + __dirname + env.assetsRoot);

// server routes ==================================================
var router = express.Router();
var routes = require('./app/routes');
routes(app, router);

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
