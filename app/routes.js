var jwt     = require('jwt-simple');
var auth    = require('./middleware/auth.js');
var config  = require('../config/app.js');
var Environment = require('../config/environment.js');
var env = new Environment();

module.exports = function(app, router) {
    'use strict';
    
    var Project             = require('./models/project');
    var Place               = require('./shared/models/place-model');

    // server routes ===========================================================
    // middleware to use for all requests
    router.use(function(req, res, next) {
        next();
    });

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function(req, res) {
        res.json({ message: 'hi :)' });
    });

    // authenticate
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

    require('./modules/blog/blog-controller')(router);
    require('./modules/climbing/climbing-controller')(router);
    require('./modules/travel/travel-controller')(router);
    require('./modules/todo/todo-controller')(router);

    // work
    router.get('/projects', function(req, res) {
        Project.find({}, {}, { sort: { 'created_at': -1 }})
            .exec(function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    });
    router.put('/project', auth, function(req, res) {
        Project.findOne({ _id: req.body._id }, function(err, project) {
            if (err) {
                res.send(err);
            }
            if (!project) {
                project = new Project(req.body);
            } else {
                for (var prop in project) {
                    if (req.body.hasOwnProperty(prop) && req.body[prop]) {
                        project[prop] = req.body[prop];
                    }
                }
            }
            project.save(function(err, newProject) {
                if (err) {
                    res.send(err);
                }
                res.json(newProject);
            });
        });
    });
    router.delete('/project/:id', auth, function(req, res) {
        Project.remove({ _id: req.params.id })
            .exec(function(err) {
                if (err) {
                    res.send(err);
                }
                res.send(200);
            });
    });

    // places
    router.get('/places', function(req, res) {
        Place.find()
            .where('name').ne(null)
            .exec(function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    });
    router.put('/place', auth, function(req, res) {
        Place.findOne({ _id: req.body._id }, function(err, place) {
            if (err) {
                res.send(err);
            }
            if (!place) {
                if (!req.body.lat || !req.body.lon) {
                    res.send(400, req.body);
                }
                place = new Place(req.body);
            } else {
                for (var prop in place) {
                    if (req.body.hasOwnProperty(prop) && req.body[prop]) {
                        place[prop] = req.body[prop];
                    }
                }
            }
            place.save(function(err, newPlace) {
                if (err) {
                    res.send(err);
                }
                res.json(newPlace);
            });
        });
    });
    router.delete('/place/:id', auth, function(req, res) {
        Place.remove({ _id: req.params.id })
            .exec(function(err) {
                if (err) {
                    res.send(err);
                }
                res.send(200);
            });
    });

    // register api routes prefixed with /api
    app.use('/api', router);

    // frontend routes =========================================================
    app.get('*', function(req, res) {
        res.sendfile('./' + env.assetsRoot + '/index.html');
    });

};