var mongoose        = require('mongoose');
var request         = require('request');
var Promise         = require('promise');
var config          = require('../../config/app');
var db              = require('../../config/db');
var Trip            = require('../models/trip');
var Place           = require('../models/place');

module.exports = {
    saveTrip: function(data) {
        'use strict';

        function retrievePhotoset(photosetId) {
            return new Promise(function(resolve, reject) {
                console.log('querying flickr api...');
                var options = {
                    uri: 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=' + config.keys.flickr + '&photoset_id=' + photosetId + '&format=json&nojsoncallback=1',
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
                    if(data && data.photoset) {
                        console.log('received photo data');
                        resolve(data);
                    } else {
                        console.log('unexpected results...', data);
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

        return new Promise(function(resolve, reject) {
            console.log('connecting to db...');
            mongoose.connect(db.url);
            
            var trip = new Trip(data);
            var promises = [];

            trip.startDate = new Date(trip.startDate);
            trip.endDate = new Date(trip.endDate);

            if(data.photosetId) {
                var promise = new Promise(function(resolve, reject) {
                    retrievePhotoset(data.photosetId).then(function(data) {
                        data.photoset.photo.forEach(function(photo) {
                            var newImage = {};
                            newImage.url = 'https://www.flickr.com/photos/' + data.photoset.owner + '/' + photo.id + '/in/set-' + data.photoset.id;
                            newImage.thumb = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_s.jpg';
                            newImage.title = photo.title;
                            trip.photos.push(newImage);
                        });
                        console.log('added ' + trip.photos.length + ' photos to trip');
                        resolve();
                    }, reject);
                });
                promises.push(promise);
            }

            if(data.locations) {
                data.locations.forEach(function(location) {
                    var promise = new Promise(function(resolve, reject) {
                        Place.find({ city: location.city, country: location.country }, function(err, place) {
                            if (err) {
                                console.error(err);
                                reject(err);
                            }
                            if (!place) {
                                place = new Place(location);
                                place.save(function(err, newPlace) {
                                    if (err) {
                                        res.send(err);
                                    }
                                    trip.places.push(newPlace._id);
                                    console.log('place created '  + newPlace.city + ', ' + newPlace.country);
                                    resolve();
                                });
                            } else {
                                trip.places.push(place._id);
                                console.log('place found '  + place.city + ', ' + place.country);
                                resolve();
                            }
                        });
                        resolve();
                    });
                    promises.push(promise);
                });
            }

            Promise.all(promises).then(function() {
                console.log('promises resolved, saving trip...');
                trip.created_at = new Date();
                trip.save(function(err, savedTrip) {
                    if(err) {
                        console.error(err);
                    }
                    console.log('created ' + trip.name);
                    mongoose.disconnect();
                    resolve(savedTrip);
                });
            }, function(err) {
                console.error(err);
                reject();
            });
        });
    },

    geocodeLocation: function(locationSearch) {
        'use strict';

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
