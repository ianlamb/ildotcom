var StarcraftProvider    = require('./starcraft-provider');

module.exports = function(router) {
    'use strict';
    
    var starcraftProvider = new StarcraftProvider();
    
    router.get('/sc2', function(req, res) {
        starcraftProvider.getProfile()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
};