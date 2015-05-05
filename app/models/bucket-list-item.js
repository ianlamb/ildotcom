var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BucketListItemSchema = new Schema({
    title: String,
    completed: { type: Boolean, default: false },
    created_at: Date,
    updated_at: Date
}).pre('save', function(next){
    var now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('BucketListItem', BucketListItemSchema);