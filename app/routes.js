var jwt     = require('jwt-simple');
var auth    = require('./middleware/auth.js');
var config  = require('../config/app.js');
var Environment = require('../config/environment.js');
var env = new Environment();

module.exports = function(app, router) {
    'use strict';
    
    // register all modules
    require('./modules/blog/blog-controller')(router);
    require('./modules/climbing/climbing-controller')(router);
    require('./modules/travel/travel-controller')(router);
    require('./modules/todo/todo-controller')(router);
    require('./modules/places/places-controller')(router);
    require('./modules/portfolio/portfolio-controller')(router);
    
    // middleware to use for all requests
    router.use(function(req, res, next) {
        next();
    });

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function(req, res) {
        res.json({ message: 'Welcome to the ianlamb.com web API' });
    });

    // authentication
    router.post('/auth', function(req, res) {
        if (!req.body.password || !config.authSecret || req.body.password !== config.authSecret) {
            return res.send(401);
        }

        var expires = new Date().getTime() + (config.tokenExpiry);
        var token = jwt.encode({
            iss: 'root',
            exp: expires
        }, app.get('jwtTokenSecret'));
         
        res.json({
            token: token,
            expires: expires
        });
    });
    
    router.get('/testAuth', auth, function(req, res) {
        res.send('You are authenticated!');
    });

    // register api routes prefixed with /api
    app.use('/api', router);

    // frontend routes =========================================================
    app.get('*', function(req, res) {
        res.sendfile('./' + env.assetsRoot + '/index.html');
    });

};