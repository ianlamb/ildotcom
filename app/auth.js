var config  = require('../config/app.js');
var jwt     = require('jwt-simple');
 
module.exports = function(req, res, next) {
    'use strict';

    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.decode(token, config.jwtTokenSecret);
            if (decoded.exp <= Date.now()) {
                res.redirect(401, '/login');
            } else if (decoded.iss !== 'root') {
                res.redirect(401, '/login');
            } else {
                next();
            }
        } catch (err) {
            res.send(500, 'Access token is muddy, aborting request');
        }
    } else {
        res.redirect(401, '/login');
    }
};