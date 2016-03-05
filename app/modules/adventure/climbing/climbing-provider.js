var logger = require('logger');
var ClimbSession = require('./climb-session-model');

module.exports = function() {
    'use strict';
    
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
    
    this.saveSession = function(data) {
        return new Promise(function(resolve, reject) {
            ClimbSession.findOne({ _id: data._id }, function(err, session) {
                if (err) {
                    reject(err);
                }
                if (!session || !data._id) {
                    session = new ClimbSession(data);
                } else {
                    for (var prop in session) {
                        if (data.hasOwnProperty(prop) && data[prop]) {
                            session[prop] = data[prop];
                        }
                    }
                }
                session.save(function(err, res) {
                    if(err) {
                        reject(err);
                    }
                    ClimbSession.findOne({ _id: res._id })
                        .populate('place')
                        .populate('photos')
                        .exec(function(err, res) {
                            if (err) {
                                reject(err);
                            }
                            resolve(res);
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