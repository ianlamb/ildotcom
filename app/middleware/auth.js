var logger = require('logger');
var config = require('config/app.js');
var jwt = require('jwt-simple');
 
module.exports = function(req, res, next) {
    'use strict';

    req.loggedIn = false;

    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.decode(token, config.jwtTokenSecret);
            if (decoded.exp > Date.now() && decoded.iss === 'root') {
                req.loggedIn = true;
            }
        } catch (err) {
            logger.warn('auth - token is fucked');
        }
    }
    next();
};

module.exports.required = function(req, res, next) {
    'use strict';

    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.decode(token, config.jwtTokenSecret);
            if (decoded.exp <= Date.now()) {
                logger.warn('auth - token has expired');
                res.send(401, 'token has expired');
            } else if (decoded.iss !== 'root') {
                logger.warn('auth - token has invalid permissions');
                res.send(401, 'token has invalid permissions');
            } else {
                logger.debug('auth - token is good to go');
                next();
            }
        } catch (err) {
            logger.warn('auth - token is fucked');
            res.send(500, 'token is fucked');
        }
    } else {
        logger.warn('auth - token is empty');
        res.redirect(401, 'token is empty');
    }
};
