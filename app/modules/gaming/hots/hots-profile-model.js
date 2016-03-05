var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var timestamp = require("middleware/timestamp.js");

var HotsProfileSchema = new Schema({
    "heroLeague": {
        "league": String,
        "mmr": Number
    },
    "quickMatch": {
        "league": String,
        "mmr": Number
    },
    "combinedHeroLevel": Number,
    "totalGamesPlayed": Number,
    "created_at": Date,
    "updated_at": Date
}).pre('save', timestamp);

module.exports = mongoose.model('HotsProfile', HotsProfileSchema);