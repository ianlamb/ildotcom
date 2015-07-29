var Environment = require('../config/environment.js');
var env = new Environment();

module.exports = function(app, router) {
    'use strict';
    
    // register all modules
    require('./modules/authentication/auth-controller')(router);
    require('./modules/blog/blog-controller')(router);
    require('./modules/climbing/climbing-controller')(router);
    require('./modules/travel/travel-controller')(router);
    require('./modules/todo/todo-controller')(router);
    require('./modules/places/places-controller')(router);
    require('./modules/portfolio/portfolio-controller')(router);
    require('./modules/gaming/gaming-controller')(router);
    
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
        res.sendfile('./' + env.assetsRoot + '/index.html');
    });

};