var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VisitSchema = new Schema({
    name: String,
    date: Date,
    notes: String,
    place: { type: Schema.Types.ObjectId, ref: 'Place' },
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
});

module.exports = mongoose.model('Visit', VisitSchema);