var mongoose        = require('mongoose');
var request         = require('request');
var Promise         = require('promise');
var app             = require('../../config/app');
var db              = require('../../config/db');
var Trip            = require('../models/trip');
var Place           = require('../models/place');
var ClimbSession    = require('../models/climb-session');

module.exports = {
    saveTrip: function(data) {
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
                        resolve();
                    });
                    promises.push(promise);
                });
            }

            Promise.all(promises).then(function(data) {
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

    saveClimbSession: function(session) {
        return new Promise(function(resolve) {
            ClimbSession.findOne({ _id: session._id }, function(err, dbSession) {
                if (err) {
                    res.end(err);
                }
                if (!dbSession) {
                    dbSession = new ClimbSession(session);
                } else {
                    if (session.date) dbSession.date = session.date;
                    if (session.place) dbSession.place = session.place;
                    if (session.notes) dbSession.notes = session.notes;
                    if (session.climbs) dbSession.climbs = session.climbs
                }
                dbSession.save(function(err, newSession) {
                    if(err) {
                        res.end(err);
                    }
                    ClimbSession.findOne({ _id: newSession._id })
                        .populate('place')
                        .populate('photos')
                        .exec(function(err, data) {
                            if (err) {
                                res.send(err);
                            }
                            resolve(data);
                        });
                });
            });
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
