/* global __dirname */
var Environment = require('../config/environment.js');
var path = require('path');
var env = new Environment();

module.exports = function(app, router) {
    'use strict';
    
    // register all modules
    require('./modules/authentication/auth-controller')(router);
    require('./modules/blog/blog-controller')(router);
    require('./modules/portfolio/portfolio-controller')(router);
    require('./modules/adventure/climbing/climbing-controller')(router);
    require('./modules/adventure/travel/travel-controller')(router);
    require('./modules/adventure/todo/todo-controller')(router);
    require('./modules/adventure/places/places-controller')(router);
    require('./modules/gaming/diablo/diablo-controller')(router);
    require('./modules/gaming/starcraft/starcraft-controller')(router);
    require('./modules/gaming/warcraft/warcraft-controller')(router);
    require('./modules/gaming/hots/hots-controller')(router);
    
    // middleware to use for all requests
    router.use(function(req, res, next) {
        next();
    });

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function(req, res) {
        res.json({ message: 'Welcome to the ianlamb.com web API' });
    });

    // register api routes prefixed with /api
    app.use('/api', router);

    // frontend routes =========================================================
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '..', env.assetsRoot, 'index.html'));
    });

};