var mongoose        = require('mongoose');
var request         = require('request');
var Promise         = require('promise');
var ClimbSession    = require('./climb-session-model');

module.exports = function() {
    
    this.getSessions = function() {
        return new Promise(function(resolve, reject) {
            ClimbSession.find()
                .populate('place')
                .populate('photos')
                .sort('-date')
                .exec(function(err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
        });
    };
    
    this.saveSession = function(session) {
        return new Promise(function(resolve, reject) {
            ClimbSession.findOne({ _id: session._id }, function(err, dbSession) {
                if (err) {
                    reject(err);
                }
                if (!dbSession) {
                    dbSession = new ClimbSession(session);
                } else {
                    for (var prop in dbSession) {
                        if (session.hasOwnProperty(prop) && session[prop]) {
                            dbSession[prop] = session[prop];
                        }
                    }
                }
                dbSession.save(function(err, newSession) {
                    if(err) {
                        reject(err);
                    }
                    ClimbSession.findOne({ _id: newSession._id })
                        .populate('place')
                        .populate('photos')
                        .exec(function(err, data) {
                            if (err) {
                                reject(err);
                            }
                            resolve(data);
                        });
                });
            });
        });
    };
    
    this.deleteSession = function(id) {
        return new Promise(function(resolve, reject) {
            ClimbSession.remove({ _id: id })
                .exec(function(err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
        });
    };
};