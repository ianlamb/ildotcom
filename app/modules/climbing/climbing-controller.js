var auth            = require('../../middleware/auth');
var ClimbingProvider    = require('./climbing-provider');

module.exports = function(router) {
    'use strict';
    
    var climbingProvider = new ClimbingProvider();
    
    router.get('/climbs', function(req, res) {
        climbingProvider.getSessions()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.put('/climb', auth, function(req, res) {
        climbingProvider.saveSession(req.body)
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.delete('/climb/:id', auth, function(req, res) {
        climbingProvider.deleteSession(req.params.id)
            .then(function() {
                res.send(200);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
};