var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TripSchema = new Schema({
    "name": String,
    "startDate": Date,
    "endDate": Date,
    "pointsOfInterest": [
        {
            "name": String,
            "url": String
        }
    ],
    "places": [{ "type": Schema.Types.ObjectId, "ref": "Place" }],
    "photos": [
        {
            "title": String,
            "url": String,
            "thumb": String
        }
    ],
    "blogPost": { "type": Schema.Types.ObjectId, "ref": "Post" },
    "created_at": Date,
    "updated_at": Date
}).pre('save', function(next) {
    'use strict';

    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('Trip', TripSchema);