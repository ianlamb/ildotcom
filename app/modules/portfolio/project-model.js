var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamp = require("middleware/timestamp.js");

var ProjectSchema = new Schema({
    "name": String,
    "slug": String,
    "desc": String,
    "url": String,
    "repo": String,
    "technologies": [String],
    "images": [String],
    "created_at": Date,
    "updated_at": Date
}).pre('save', timestamp);

module.exports = mongoose.model('Project', ProjectSchema);