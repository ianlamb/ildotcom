var auth            = require('../../middleware/auth');
var GamingProvider    = require('./gaming-provider');

module.exports = function(router) {
    'use strict';
    
    var gamingProvider = new GamingProvider();
    
    router.get('/wow', function(req, res) {
        gamingProvider.getWowProfile()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.get('/d3', function(req, res) {
        gamingProvider.getDiabloProfile()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.get('/sc2', function(req, res) {
        gamingProvider.getStarcraftProfile()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
};