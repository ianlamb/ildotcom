var Promise             = require('promise');
var WowProfile          = require('./wow-profile-model');
var DiabloProfile       = require('./diablo-profile-model');
var StarcraftProfile    = require('./starcraft-profile-model');

module.exports = function() {
    'use strict';
    
    // stored profiles are essentially a history, so we only return the latest record to the user
    this.getWowProfile = function() {
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
    
    this.getDiabloProfile = function() {
        return new Promise(function(resolve, reject) {
            DiabloProfile.findOne({}, {}, { sort: { 'created_at': -1 }})
                .exec(function(err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
        });
    };
    
    this.getStarcraftProfile = function() {
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
};