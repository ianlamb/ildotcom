var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Dota2DataSchema = new Schema({
    personId: Schema.Types.ObjectId,
    soloMmr: Number,
    partyMmr: Number
}, { strict: false });

module.exports = mongoose.model('Dota2Data', Dota2DataSchema);