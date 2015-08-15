var auth            = require('../../../middleware/auth');
var TravelProvider  = require('./travel-provider');

module.exports = function(router) {
    'use strict';
    
    var travelProvider = new TravelProvider();
    
    router.get('/trips', function(req, res) {
        travelProvider.getTrips()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.put('/trip', auth, function(req, res) {
        travelProvider.saveTrip(req.body)
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
};