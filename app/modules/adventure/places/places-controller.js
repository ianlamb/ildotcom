var logger = require('logger');
var auth = require('middleware/auth');
var PlacesProvider = require('./places-provider');

module.exports = function(router) {
    'use strict';
    
    var placesProvider = new PlacesProvider();
    
    router.get('/places', function(req, res) {
        placesProvider.getPlaces()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.get('/cities', function(req, res) {
        placesProvider.getCities()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.put('/place', auth, function(req, res) {
        placesProvider.savePlace(req.body)
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.delete('/place/:id', auth, function(req, res) {
        placesProvider.deletePlace(req.params.id)
            .then(function() {
                res.send(200);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
};