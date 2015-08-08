var jwt         = require('jwt-simple');
var Promise     = require('promise');
var config      = require('../../../config/app');

module.exports = function() {
    'use strict';
    
    this.login = function(password) {
        return new Promise(function(resolve, reject) {
            if (!password || !config.authSecret || password !== config.authSecret) {
                reject();
            }
    
            var expires = new Date().getTime() + (config.tokenExpiry);
            var token = jwt.encode({
                iss: 'root',
                exp: expires
            }, config.jwtTokenSecret);
             
            resolve({
                token: token,
                expires: expires
            });
        });
    };
};