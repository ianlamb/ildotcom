var request         = require('request');
var Promise         = require('promise');
var config          = require('../../../../config/app');
var Place        	= require('../places/place-model');
var Trip        	= require('./trip-model');

module.exports = function() {
    'use strict';
    
    this.getTrips = function() {
        return new Promise(function(resolve, reject) {
            Trip.find()
                .populate('places')
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
    
    this.saveTrip = function(data) {
        return new Promise(function(resolve, reject) {
            Trip.findOne({ _id: data._id }, function(err, trip) {
                var promises = [];
            
                if (err) {
                    reject(err);
                }
                if (!trip) {
                    trip = new Trip(data);
                } else {
                    for (var prop in trip) {
                        if (data.hasOwnProperty(prop) && data[prop]) {
                            trip[prop] = data[prop];
                        }
                    }
                }
    
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
                                            reject(err);
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
                    trip.save(function(err, savedTrip) {
                        if(err) {
                            console.error(err);
                        }
                        console.log('saved ' + savedTrip.name);
                        resolve(savedTrip);
                    });
                }, function(err) {
                    console.error(err);
                    reject();
                });
            });
        });
    };
    
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
                    reject();
                }
                var data = JSON.parse(body);
                if(data && data.photoset) {
                    console.log('received photo data');
                    resolve(data);
                } else {
                    console.log('unexpected results...', data);
                    reject();
                }
            }).on('error', function(e) {
                console.error(e.message);
                reject(e.message);
            });
        });
    }
};