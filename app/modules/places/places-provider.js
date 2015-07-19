var Promise         = require('promise');
var Place        	= require('./place-model');

module.exports = function() {
    'use strict';
    
    this.getPlaces = function() {
        return new Promise(function(resolve, reject) {
            Place.find()
                .where('name').ne(null)
                .exec(function(err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
        });
    };
    
    this.savePlace = function(data) {
        return new Promise(function(resolve, reject) {
            Place.findOne({ _id: data._id }, function(err, place) {
                if (err) {
                    reject(err);
                }
                if (!place) {
                    if (!data.lat || !data.lon) {
                        reject('missing lat/long coordinates');
                    }
                    place = new Place(data);
                } else {
                    for (var prop in place) {
                        if (data.hasOwnProperty(prop) && data[prop]) {
                            place[prop] = data[prop];
                        }
                    }
                }
                place.save(function(err, res) {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            });
        });
    };
    
    this.deletePlace = function(id) {
        return new Promise(function(resolve, reject) {
            Place.remove({ _id: id })
                .exec(function(err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
        });
    };
};