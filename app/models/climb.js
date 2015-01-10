var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClimbSchema = new Schema({
    type: String,
    purpose: { type: String, default: 'training' },
    sends: [String]
});

module.exports = mongoose.model('Climb', ClimbSchema);