var auth          = require('../../middleware/auth');
var AuthProvider  = require('./auth-provider');

module.exports = function(router) {
    'use strict';
    
    var authProvider = new AuthProvider();
    
    router.post('/auth', function(req, res) {
        authProvider.login(req.body.password)
            .then(function(token) {
                res.send(token);
            })
            .catch(function(err) {
                console.err(err);
                res.send(401);
            });
    });
    
    router.get('/testAuth', auth, function(req, res) {
        res.send('You are authenticated!');
    });
};