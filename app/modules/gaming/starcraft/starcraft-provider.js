var Promise             = require('promise');
var StarcraftProfile    = require('./starcraft-profile-model');

module.exports = function() {
    'use strict';
    
    this.getProfile = function() {
        return new Promise(function(resolve, reject) {
            StarcraftProfile.findOne({}, {}, { sort: { 'created_at': -1 }})
                .exec(function(err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
        });
    };
    
    this.saveProfile = function(data) {
        return new Promise(function(resolve, reject) {
            var profile = new StarcraftProfile(data);
            
            console.log('saving profile...');
            profile.save(function(err, res) {
                if(err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    };
};