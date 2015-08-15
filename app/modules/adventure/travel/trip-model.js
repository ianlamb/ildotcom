var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var timestamp    = require("../../../middleware/timestamp.js");

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
}).pre('save', timestamp);

module.exports = mongoose.model('Trip', TripSchema);