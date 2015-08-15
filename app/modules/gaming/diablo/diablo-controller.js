var auth            = require('../../../middleware/auth');
var DiabloProvider    = require('./diablo-provider');

module.exports = function(router) {
    'use strict';
    
    var diabloProvider = new DiabloProvider();
    
    router.get('/d3', function(req, res) {
        diabloProvider.getProfile()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
};