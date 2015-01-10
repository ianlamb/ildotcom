var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GameFeedItemSchema = new Schema({
    personId: Schema.Types.ObjectId,
    game: String,
    description: String
    timestamp: Date,
});

module.exports = mongoose.model('GameFeedItem', GameFeedItemSchema);