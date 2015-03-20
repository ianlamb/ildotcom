var jwt     = require('jwt-simple');
var moment  = require('moment');
var auth    = require('./auth.js');
var config  = require('../config/app.js');

module.exports = function(app, router) {

    var AdventureManager    = require('./managers/adventure-manager.js');
    
    var Person              = require('./models/person');
    var Place               = require('./models/place');
    var Photo               = require('./models/photo');
    var Trip                = require('./models/trip');
    var ClimbSession        = require('./models/climb-session');
    var BucketListItem      = require('./models/bucket-list-item');
    var WowProfile          = require('./models/wow-profile');
    var DiabloProfile       = require('./models/diablo-profile');
    var StarcraftProfile    = require('./models/starcraft-profile');
    var SteamProfile        = require('./models/steam-profile');

    // server routes ===========================================================
    // middleware to use for all requests
    router.use(function(req, res, next) {
        // do logging
        next();
    });

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', function(req, res) {
        res.json({ message: 'hi :)' });
    });

    // authenticate
    router.route('/auth').post(function(req, res) {
        if (!req.body.password
            || !config.authSecret
            || req.body.password !== config.authSecret) {
            return res.send(401);
        }

        var expires = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 days
        var token = jwt.encode({
            iss: 'root',
            exp: expires
        }, app.get('jwtTokenSecret'));
         
        res.json({
            token : token,
            expires: expires
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

    // climbing
    router.get('/climbs', function(req, res) {
        ClimbSession.find()
            .populate('place')
            .populate('photos')
            .sort('-date')
            .exec(function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    });

    router.put('/climb', [auth], function(req, res) {
        AdventureManager.saveClimbSession(req.body).then(function(data) {
            res.json(data);
        });
    });

    // travel
    router.route('/trips').get(function(req, res) {
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
    
    router.route('/trip', [auth]).put(function(req, res) {
        AdventureManager.saveTrip(req.body).then(function() {
            // do stuff
        });
    });

    // bucket list
    router.route('/bucketlist').get(function(req, res) {
        BucketListItem.find({}, {}, { sort: { 'created_at': -1 }})
            .exec(function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    });
    router.route('/bucketlist', [auth]).put(function(req, res) {
        var data = { title: req.body.title, completed: req.body.completed };
        BucketListItem.findOne({ _id: req.body._id }, function(err, todo) {
            if (err) {
                res.end(err);
            }
            if (!todo) {
                todo = new BucketListItem(data);
            } else {
                todo.title = data.title;
                todo.completed = data.completed;
            }
            todo.save(function(err) {
                if (err) {
                    res.end(err);
                }
                res.json(todo);
            });
        });
    });
    router.route('/bucketlist/:id', [auth]).delete(function(req, res) {
        var todoId = req.params.id;
        BucketListItem.remove({ _id: todoId })
            .exec(function(err) {
                if (err) {
                    res.send(err);
                }
                res.send(200);
            });
    });

    // games
    router.route('/wow').get(function(req, res) {
        WowProfile.findOne({}, {}, { sort: { 'created_at': -1 }})
            .exec(function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    });
    router.route('/d3').get(function(req, res) {
        DiabloProfile.findOne({}, {}, { sort: { 'created_at': -1 }})
            .exec(function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    });
    router.route('/sc2').get(function(req, res) {
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
        res.sendfile('./public/index.html');
    });

};