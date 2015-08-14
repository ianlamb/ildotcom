var Promise         = require('promise');
var request         = require('request');
var config        	= require('../../../../config/app');
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
    
    this.getCities = function() {
        return new Promise(function(resolve, reject) {
            Place.find()
                .where('city').ne(null)
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
                    console.log('Saved ' + res.city);
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
    
    this.geocodeLocation = function(locationSearch) {
        return new Promise(function(resolve, reject) {
            console.log('geocoding...');
            var options = {
                uri: 'http://open.mapquestapi.com/geocoding/v1/address?key=' + config.keys.mapquest + '&location=' + locationSearch,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            request(options, function(err, res, body) {
                if(err) {
                    reject(err);
                }
                if(!body) {
                    reject('request returned empty');
                }
                var data = JSON.parse(body);
                if(data) {
                    console.log('received geocode data');
                    resolve(data.results);
                } else {
                    reject('unexpected results...');
                }
            }).on('error', function(e) {
                    reject(e.message);
            });
        });
    };
};
