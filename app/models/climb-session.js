var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClimbSessionSchema = new Schema({
    'date': Date,
    'notes': String,
    'climbs': [{
        'type': { type: String },
        'sends': [String]
    }],
    'place': { 'type': Schema.Types.ObjectId, 'ref': 'Place' }
});

module.exports = mongoose.model('ClimbSession', ClimbSessionSchema);