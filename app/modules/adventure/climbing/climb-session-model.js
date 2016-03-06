var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamp = require("middleware/timestamp.js");

var ClimbSessionSchema = new Schema({
    "date": Date,
    "notes": String,
    "climbs": [{
        "type": { "type": String },
        "sends": [String]
    }],
    "place": { "type": Schema.Types.ObjectId, "ref": "Place" },
    "created_at": Date,
    "updated_at": Date
}).pre('save', timestamp);

module.exports = mongoose.model('ClimbSession', ClimbSessionSchema);