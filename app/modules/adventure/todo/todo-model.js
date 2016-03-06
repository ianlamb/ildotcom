var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamp = require("middleware/timestamp.js");

var BucketListItemSchema = new Schema({
    "title": String,
    "completed": { "type": Boolean, "default": false },
    "created_at": Date,
    "updated_at": Date
}).pre('save', timestamp);

module.exports = mongoose.model('BucketListItem', BucketListItemSchema);