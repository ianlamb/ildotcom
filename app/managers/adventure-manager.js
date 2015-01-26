var mongoose = require('mongoose');
var request = require('request');
var Promise = require('promise');
var app = require('../../config/app');
var db = require('../../config/db');
var Trip   = require('../models/trip');
var Place  = require('../models/place');
var Photo  = require('../models/photo');

module.exports = {
    saveTrip: function(data) {
        var trip = new Trip(data);
        var promises = [];

        trip.startDate = new Date(trip.startDate);
        trip.endDate = new Date(trip.endDate);
        
        if(data.photosetId) {
            var promise = new Promise(function(resolve, reject) {
                retrievePhotoset(data.photosetId).then(function(data) {
                    var images = [];
                    data.photoset.photo.forEach(function(photo) {
                        var newImage = {};
                        newImage.url = 'https://www.flickr.com/photos/' + data.photoset.owner + '/' + photo.id;
                        newImage.thumb = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_s.jpg';
                        newImage.title = photo.title;
                        trip.photos.push(newImage);
                    });
                    resolve();
                }, reject);
            });
            promises.push(promise);
        }
        
        if(data.locations) {
            data.locations.forEach(function(location) {
                var promise = new Promise(function(resolve, reject) {
                    Place.create(location, function(err, place) {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        if (!place) {
                            console.warn('failed to create Place');
                            reject();
                        }
                        trip.places.push(place._id);
                        console.log('place created '  + place.city + ', ' + place.country);
                        resolve();
                    });
                });
                promises.push(promise);
            });
        }

        Promise.all(promises).then(function(data) {
            console.log('promises resolved, saving trip...');
            trip.created_at = new Date();
            trip.save(function(err) {
                if(err) {
                    console.error(err);
                }
                console.log('created ' + trip.name);
                //mongoose.disconnect();
            });
        }, function(err) {
            console.error(err);
        });
    },

    geocodeLocation: function(locationSearch) {
        return new Promise(function(resolve) {
            console.log('geocoding...');
            var options = {
                uri: 'http://open.mapquestapi.com/geocoding/v1/address?key=' + config.keys.mapquest + '&location=' + locationSearch,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            request(options, function(err, rez, body) {
                if(!body) {
                    console.log('request returned empty');
                    mongoose.disconnect();
                    return;
                }
                var data = JSON.parse(body);
                if(data) {
                    console.log('received geocode data');
                    resolve(data.results);
                } else {
                    console.log('unexpected results...');
                    mongoose.disconnect();
                }
            }).on('error', function(e) {
                console.error(e.message);
                mongoose.disconnect();
            });
        });
    }
};

function retrievePhotoset(photosetId) {
    return new Promise(function(resolve, reject) {
        console.log('querying flickr api...');
        var options = {
            uri: 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + app.keys.flickr + '&photoset_id=' + photosetId + '&format=json&nojsoncallback=1',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        request(options, function(err, rez, body) {
            if(!body) {
                console.log('request returned empty');
                mongoose.disconnect();
                reject();
            }
            var data = JSON.parse(body);
            if(data) {
                console.log('received photo data');
                resolve(data);
            } else {
                console.log('unexpected results...');
                mongoose.disconnect();
                reject();
            }
        }).on('error', function(e) {
            console.error(e.message);
            mongoose.disconnect();
            reject(e.message);
        });
    });
}
