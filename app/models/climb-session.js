var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClimbSessionSchema = new Schema({
    'date': Date,
    'notes': String,
    'climbs': [{
        'type': { type: String },
        'sends': [String]
    }],
    'place': { 'type': Schema.Types.ObjectId, 'ref': 'Place' },
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

module.exports = mongoose.model('ClimbSession', ClimbSessionSchema);