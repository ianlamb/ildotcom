var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var timestamp    = require("../../middleware/timestamp.js");

var PostSchema = new Schema({
    "title": String,
    "body": String,
    "slug": String,
    "tags": [String],
    "created_at": Date,
    "updated_at": Date
}).pre('save', timestamp);

module.exports = mongoose.model('Post', PostSchema);