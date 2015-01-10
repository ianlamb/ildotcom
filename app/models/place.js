var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PlaceSchema = new Schema({
    name: String,
    slug: String,
    address: String,
    city: String,
    region: String,
    country: String,
    phone: String,
    url: String,
    notes: String,
    lat: Number,
    lon: Number,
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
});

module.exports = mongoose.model('Place', PlaceSchema);