var config  = require('../config/app.js');
var jwt     = require('jwt-simple');
 
module.exports = function(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.decode(token, config.jwtTokenSecret);
            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 400);
            }
            if (decoded.iss !== 'root') {
                res.end('User has no privileges', 401);
            }
            next();
        } catch (err) {
            res.end('Access token is muddy, aborting request', 500);
        }
    } else {
        res.send(401);
    }
};