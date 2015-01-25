var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PhotoSchema = new Schema({
    url: String,
    thumb: String,
    desc: String,
    tags: [String],
    date: Date
});

module.exports = mongoose.model('Photo', PhotoSchema);