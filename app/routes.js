module.exports = function(app, router) {

    var Person       = require('./models/person');
    var ClimbSession = require('./models/climb-session');
    var WowProfile   = require('./models/wow-profile');
    var DiabloProfile   = require('./models/diablo-profile');

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

    router.route('/ian').get(function(req, res) {
        Person.findOne({ slug: 'ian' })
            .populate('photos')
            .exec(function(err, data) {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    });

    // climbing
    router.route('/climbs').get(function(req, res) {
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

    router.route('/climb').put(function(req, res) {
        // todo
    });

    // travel
    router.route('/travels').get(function(req, res) {
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

    router.route('/travel').put(function(req, res) {
        // todo
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

    // register api routes prefixed with /api
    app.use('/api', router);

    // frontend routes =========================================================
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};