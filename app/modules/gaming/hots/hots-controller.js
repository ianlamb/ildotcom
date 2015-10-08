var HotsProvider    = require('./hots-provider');

module.exports = function(router) {
    'use strict';
    
    var hotsProvider = new HotsProvider();
    
    router.get('/hots', function(req, res) {
        hotsProvider.getProfile()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
};