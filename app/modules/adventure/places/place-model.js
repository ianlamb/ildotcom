var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamp = require("middleware/timestamp.js");

var PlaceSchema = new Schema({
    "name": String,
    "slug": String,
    "address": String,
    "city": String,
    "region": String,
    "country": String,
    "countryCode": String,
    "url": String,
    "notes": String,
    "climbable": Boolean,
    "lat": Number,
    "lng": Number,
    "photos": [{ "type": Schema.Types.ObjectId, "ref": "Photo" }],
    "created_at": Date,
    "updated_at": Date
}).pre('save', timestamp);

module.exports = mongoose.model('Place', PlaceSchema);