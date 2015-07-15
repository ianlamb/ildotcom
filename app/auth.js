var config  = require('../config/app.js');
var jwt     = require('jwt-simple');
 
module.exports = function(req, res, next) {
    'use strict';

    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.decode(token, config.jwtTokenSecret);
            if (decoded.exp <= Date.now()) {
                res.send(401, 'token has expired');
            } else if (decoded.iss !== 'root') {
                res.send(401, 'token has invalid permissions');
            } else {
                next();
            }
        } catch (err) {
            res.send(500, 'token is fucked');
        }
    } else {
        res.redirect(401, 'token empty');
    }
};