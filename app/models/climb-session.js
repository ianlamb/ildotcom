var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClimbSchema = new Schema({
    type: String,
    purpose: { type: String, default: 'training' },
    sends: [String]
});

var ClimbSessionSchema = new Schema({
    date: Date,
    notes: String,
    climbs: [ClimbSchema],
    place: { type: Schema.Types.ObjectId, ref: 'Place' },
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
});

module.exports = mongoose.model('ClimbSession', ClimbSessionSchema);