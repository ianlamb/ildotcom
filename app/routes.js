/* global __dirname */
var env = require('config/environment.js');
var path = require('path');
var auth = require('./middleware/auth');

module.exports = function(app, router) {
    'use strict';

    // middleware to use for all requests
    router.use(auth);

    // register all modules
    require('./modules/authentication/auth-controller')(router);
    require('./modules/blog/blog-controller')(router);
    require('./modules/portfolio/portfolio-controller')(router);
    require('./modules/photos/photo-controller')(router);
    require('./modules/adventure/climbing/climbing-controller')(router);
    require('./modules/adventure/travel/travel-controller')(router);
    require('./modules/adventure/todo/todo-controller')(router);
    require('./modules/adventure/places/places-controller')(router);
    require('./modules/gaming/diablo/diablo-controller')(router);
    require('./modules/gaming/starcraft/starcraft-controller')(router);
    require('./modules/gaming/warcraft/warcraft-controller')(router);
    require('./modules/gaming/hots/hots-controller')(router);

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
