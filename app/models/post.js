var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    body: String,
    slug: String,
    tags: [String],
    created_at: Date,
    updated_at: Date
}).pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('Post', PostSchema);