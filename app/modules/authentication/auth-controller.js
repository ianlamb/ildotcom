var logger = require('logger');
var auth = require('middleware/auth');
var AuthProvider = require('./auth-provider');

module.exports = function(router) {
    'use strict';
    
    var authProvider = new AuthProvider();
    
    router.post('/auth', function(req, res) {
        authProvider.login(req.body.password)
            .then(function(token) {
                logger.debug('auth controller - login success', req.body.password);
                res.send(token);
            })
            .catch(function(err) {
                logger.warn('auth controller - login failure', req.body.password, err);
                res.sendStatus(401);
            });
    });
    
    router.get('/testAuth', auth.required, function(req, res) {
        logger.debug('auth controller - authentication test worked, congrats');
        res.send('You are authenticated!');
    });
};