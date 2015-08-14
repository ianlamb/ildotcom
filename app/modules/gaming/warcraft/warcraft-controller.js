var auth            = require('../../../middleware/auth');
var WarcraftProvider    = require('./warcraft-provider');

module.exports = function(router) {
    'use strict';
    
    var warcraftProvider = new WarcraftProvider();
    
    router.get('/wow', function(req, res) {
        warcraftProvider.getProfile()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
};