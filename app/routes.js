var jwt     = require('jwt-simple');
var auth    = require('./middleware/auth.js');
var config  = require('../config/app.js');
var Environment = require('../config/environment.js');
var env = new Environment();

module.exports = function(app, router) {
    'use strict';

    var AdventureManager    = require('./managers/adventure-manager.js');
    
    var Project             = require('./models/project');
    var Place               = require('./models/place');
    var Trip                = require('./models/trip');
    var BucketListItem      = require('./models/bucket-list-item');
    var WowProfile          = require('./models/wow-profile');
    var DiabloProfile       = require('./models/diablo-profile');
    var StarcraftProfile    = require('./models/starcraft-profile');

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

        var expires = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days
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

    // travel
    router.get('/trips', function(req, res) {
        Trip.find()
            .populate('places')
            .populate('photos')
            .sort('-date')
            .exec(function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    });
    router.put('/trip', auth, function(req, res) {
        AdventureManager.saveTrip(req.body).then(function() {
            res.send(501);
        });
    });

    // bucket list
    router.get('/bucketlist', function(req, res) {
        BucketListItem.find({}, {}, { sort: { 'created_at': -1 }})
            .exec(function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    });
    router.put('/bucketlist', auth, function(req, res) {
        BucketListItem.findOne({ _id: req.body._id }, function(err, todo) {
            if (err) {
                res.send(err);
            }
            if (!todo) {
                todo = new BucketListItem(req.body);
            } else {
                todo.title = req.body.title;
                todo.completed = req.body.completed;
            }
            todo.save(function(err, newTodo) {
                if (err) {
                    res.send(err);
                }
                res.json(newTodo);
            });
        });
    });
    router.delete('/bucketlist/:id', auth, function(req, res) {
        BucketListItem.remove({ _id: req.params.id })
            .exec(function(err) {
                if (err) {
                    res.send(err);
                }
                res.send(200);
            });
    });

    // games
    // stored profiles are essentially a history, so we only return the latest record to the user
    router.get('/wow', function(req, res) {
        WowProfile.findOne({}, {}, { sort: { 'created_at': -1 }})
            .exec(function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    });
    router.get('/d3', function(req, res) {
        DiabloProfile.findOne({}, {}, { sort: { 'created_at': -1 }})
            .exec(function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    });
    router.get('/sc2', function(req, res) {
        StarcraftProfile.findOne({}, {}, { sort: { 'created_at': -1 }})
            .exec(function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    });

    // register api routes prefixed with /api
    app.use('/api', router);

    // frontend routes =========================================================
    app.get('*', function(req, res) {
        res.sendfile('./' + env.assetsRoot + '/index.html');
    });

};