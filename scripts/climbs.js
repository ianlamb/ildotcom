var db = require('../config/db');
var mongoose = require('mongoose');
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var http = require('http');
var https = require('https');
var request = require('request');
var querystring = require('querystring');

var Place = require('../app/models/place');
var Photo = require('../app/models/photo');
var ClimbSession = require('../app/models/climb-session');

var AdventureManager = require('../app/managers/adventure-manager');

console.log('connecting to db...');
mongoose.connect(db.url);

// create place: Junction
// var place = new Place({
//     name: 'Junction Climbing Centre',
//     slug: 'junction',
//     address: '1030 Elias St',
//     city: 'London',
//     region: 'ON',
//     country: 'Canada',
//     phone: '519-438-1717',
//     url: 'http://junctionclimbing.com/',
//     notes: 'London\'s Climbing Gym',
//     lat: 42.998190,
//     lon: -81.217777
// });
// place.save();

// var place = new Place({
//     name: 'Rattlesnake Point Conservation Area',
//     slug: 'rattlesnake',
//     address: '7200 Appleby Line',
//     city: 'Milton',
//     region: 'ON',
//     country: 'Canada',
//     phone: '905-878-1147',
//     url: 'http://www.conservationhalton.ca/rattlesnake-point',
//     notes: '',
//     lat: 43.4676,
//     lon: -79.9127
// });
// place.save();

// var place = new Place({
//     name: 'Grand River Rocks',
//     slug: 'grand-river-rocks',
//     address: '50 Borden Ave S #1',
//     city: 'Kitchener',
//     region: 'ON',
//     country: 'Canada',
//     phone: '519-742-1389',
//     url: 'http://grandriverrocks.com/',
//     notes: 'Kitchener\'s Climbing Gym',
//     lat: 43.44152,
//     lon: -80.475053
// });
// place.save();


// new sessions
var climbs, images;

climbs = [
    { type: 'Top Rope', sends: ['5.8', '5.8', '5.9', '5.9'] }
];
createClimbSession(climbs, 'rattlesnake', new Date('2014-09-13 19:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V3', 'V3', 'V3', 'V4', 'V4', 'V4', 'V4', 'V4', 'V5', 'V5', 'V6'] }
];
createClimbSession(climbs, 'junction', new Date('2014-10-16 19:30 GMT-0400'));

climbs = [
    { type: 'Lead', sends: ['5.8', '5.9'] },
    { type: 'Boulder', sends: ['V3', 'V3', 'V4', 'V5', 'V5', 'V6'] }
];
createClimbSession(climbs, 'junction', new Date('2014-10-18 16:00 GMT-0400'));

climbs = [
    { type: 'Lead', sends: ['5.9-', '5.9', '5.9+', '5.10'] }
];
createClimbSession(climbs, 'junction', new Date('2014-10-19 13:30 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V2', 'V2', 'V2', 'V3', 'V3', 'V3', 'V4', 'V4', 'V4', 'V6'] }
];
createClimbSession(climbs, 'junction', new Date('2014-10-20 21:30 GMT-0400'));

climbs = [
    { type: 'Lead', sends: ['5.8', '5.10-', '5.10'] },
    { type: 'Boulder', sends: ['V2', 'V2', 'V3', 'V3', 'V3', 'V4', 'V4', 'V6'] }
];
createClimbSession(climbs, 'junction', new Date('2014-10-22 21:30 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V3', 'V3', 'V3', 'V4', 'V4', 'V4', 'V5', 'V5', 'V5', 'V5', 'V5', 'V6', 'V6'] }
];
createClimbSession(climbs, 'junction', new Date('2014-10-25 15:30 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V2', 'V2', 'V2', 'V2', 'V2', 'V2', 'V3', 'V3', 'V3', 'V3', 'V3', 'V3', 'V4', 'V4', 'V4', 'V5', 'V6', 'V6'] }
];
createClimbSession(climbs, 'junction', new Date('2014-10-27 21:30 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V2', 'V1', 'V2', 'V6', 'V2', 'V3', 'V5', 'V5', 'V4', 'V2', 'V2', 'V3', 'V2', 'V3', 'V4', 'V4', 'V6'] }
];
createClimbSession(climbs, 'junction', new Date('2014-11-03 21:00 GMT-0400'), 'Practice on competition problems');

climbs = [
    { type: 'Boulder', sends: ['V2', 'V2', 'V3', 'V3', 'V4', 'V4', 'V5', 'V5', 'V5', 'V6'] }
];
createClimbSession(climbs, 'junction', new Date('2014-11-05 20:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V2', 'V2', 'V3', 'V4', 'V4', 'V5', 'V6'] }
];
createClimbSession(climbs, 'junction', new Date('2014-11-16 20:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V2', 'V2', 'V3', 'V4', 'V6'] },
    { type: 'Lead', sends: ['5.9', '5.9+', '5.10-', '5.10'] }
];
createClimbSession(climbs, 'junction', new Date('2014-11-17 20:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V2', 'V2', 'V2', 'V3', 'V3', 'V4', 'V5', 'V6'] },
    { type: 'Top Rope', sends: ['5.10-', '5.9+', '5.9+', '5.9-', '5.9-', '5.9-', '5.9-'] }
];
createClimbSession(climbs, 'junction', new Date('2014-11-19 20:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V1', 'V2', 'V2', 'V3', 'V3', 'V3', 'V3', 'V4', 'V4', 'V4', 'V4', 'V4', 'V4', 'V4', 'V5', 'V5', 'V5', 'V6', 'V6'] }
];
createClimbSession(climbs, 'junction', new Date('2014-11-22 20:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V2', 'V3', 'V3', 'V4', 'V4', 'V4'] },
    { type: 'Lead', sends: ['5.9+'] }
];
createClimbSession(climbs, 'junction', new Date('2014-11-19 20:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V1', 'V2', 'V3', 'V4', 'V4', 'V4', 'V5'] }
];
createClimbSession(climbs, 'junction', new Date('2014-12-02 20:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V2', 'V3', 'V3', 'V4', 'V4', 'V4', 'V4', 'V4', 'V5', 'V6'] }
];
createClimbSession(climbs, 'junction', new Date('2014-12-09 20:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V2', 'V3', 'V3', 'V4', 'V4', 'V4', 'V4', 'V5'] }
];
createClimbSession(climbs, 'junction', new Date('2014-12-16 20:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V3', 'V3', 'V3', 'V4', 'V4', 'V4', 'V4', 'V4', 'V5'] }
];
createClimbSession(climbs, 'junction', new Date('2015-01-03 20:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V2', 'V3', 'V3', 'V3', 'V4', 'V4', 'V4', 'V4'] }
];
createClimbSession(climbs, 'junction', new Date('2015-01-05 20:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V1', 'V2', 'V3', 'V3', 'V3', 'V3', 'V5', 'V5'] },
    { type: 'Lead', sends: ['5.9', '5.9'] }
];
createClimbSession(climbs, 'junction', new Date('2015-01-22 20:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V0', 'V1', 'V1', 'V2', 'V2', 'V2', 'V2', 'V3', 'V3', 'V5'] },
    { type: 'Top Rope', sends: ['5.8', '5.11-'] }
];
createClimbSession(climbs, 'junction', new Date('2015-01-24 16:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V0', 'V1', 'V1', 'V2', 'V2', 'V2', 'V2', 'V3'] },
    { type: 'Top Rope', sends: ['5.9+', '5.10', '5.10+'] }
];
createClimbSession(climbs, 'junction', new Date('2015-01-27 16:00 GMT-0400'));

climbs = [
    { type: 'Boulder', sends: ['V0', 'V1', 'V2', 'V2', 'V4'] }
];
createClimbSession(climbs, 'junction', new Date('2015-01-29 16:00 GMT-0400'));

climbs = [
     { type: 'Boulder', sends: ['V1', 'V3', 'V3', 'V3', 'V4', 'V6'] },
     { type: 'Top Rope', sends: ['5.11-', '5.9+'] }
];
createClimbSession(climbs, 'junction', new Date('2015-02-05 16:00 GMT-0400'));

climbs = [
     { type: 'Boulder', sends: ['V2', 'V3', 'V3', 'V4', 'V4', 'V5', 'V5', 'V5'] }
];
createClimbSession(climbs, 'junction', new Date('2015-02-08 16:00 GMT-0400'));

climbs = [
     { type: 'Boulder', sends: ['V2', 'V3', 'V3', 'V4', 'V4', 'V5', 'V5', 'V5'] }
];
createClimbSession(climbs, 'junction', new Date('2015-02-10 16:00 GMT-0400'));

climbs = [
     { type: 'Boulder', sends: ['V3', 'V3', 'V5', 'V5', 'V5', 'V4', 'V3', 'V2'] }
];
createClimbSession(climbs, 'junction', new Date('2015-02-12 16:00 GMT-0400'));

climbs = [
     { type: 'Top Rope', sends: ['5.10'] },
     { type: 'Boulder', sends: ['V4', 'V2', 'V1', 'V3', 'V4', 'V5', 'V2', 'V3', 'V5'] }
];
createClimbSession(climbs, 'junction', new Date('2015-02-17 16:00 GMT-0400'));

climbs = [
     { type: 'Boulder', sends: ['V2', 'V2', 'V3', 'V3'] }
];
createClimbSession(climbs, 'junction', new Date('2015-02-19 16:00 GMT-0400'));

climbs = [
     { type: 'Boulder', sends: ['V1', 'V2', 'V3', 'V4', 'V4', 'V4', 'V5', 'V5', 'V5'] }
];
createClimbSession(climbs, 'grand-river-rocks', new Date('2015-02-21 16:00 GMT-0400'), 'Tour De Bloc comp; placed #11 in Recreational');

climbs = [
     { type: 'Boulder', sends: ['V2', 'V3', 'V3', 'V4'] }
];
createClimbSession(climbs, 'junction', new Date('2015-02-22 16:00 GMT-0400'));



function createClimbSession(climbs, location, workingDate, notes) {
    Place.findOne({ 'slug': location }, '_id name', function(err, place) {
        if (err) console.log(err);
        var session = {
            climbs: climbs,
            place: place._id,
            date: workingDate,
            notes: notes
        };
        if(session.date.dst())
            session.date.setHours(session.date.getHours()-1);
        ClimbSession.create(session, function(err, sess) {
            if (err) console.log(err);
            console.log('Created Climbing Session: ' + sess._id);
        });
    });
}



Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}
