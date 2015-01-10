var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PhotoSchema = new Schema({
    date: Date,
    file: String,
    notes: String,
    tags: [String],
    people: [Schema.Types.ObjectId],
    place: Schema.Types.ObjectId
});

module.exports = mongoose.model('Photo', PhotoSchema);