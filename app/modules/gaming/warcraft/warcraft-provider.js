var WowProfile          = require('./wow-profile-model');

module.exports = function() {
    'use strict';
    
    this.getProfile = function() {
        return new Promise(function(resolve, reject) {
            WowProfile.findOne({}, {}, { sort: { 'created_at': -1 }})
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
            var profile = new WowProfile(data);
            
            profile.save(function(err, res) {
                if(err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    };
};