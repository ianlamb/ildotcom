var config  = require('../config/app.js');
var jwt     = require('jwt-simple');
 
module.exports = function(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.decode(token, config.jwtTokenSecret);
            if (decoded.exp <= Date.now()) {
                res.send(401, 'Access token has expired');
            } else if (decoded.iss !== 'root') {
                res.send(401, 'User has no privileges');
            } else {
                next();
            }
        } catch (err) {
            res.send(500, 'Access token is muddy, aborting request');
        }
    } else {
        res.send(401);
    }
};