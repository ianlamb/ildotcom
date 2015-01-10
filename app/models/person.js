var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonSchema = new Schema({
    name: { first: String, middle: String, last: String, full: String },
    slug: String,
    dob: Date,
    email: String,
    phone: String,
    address: String,
    city: String,
    region: String,
    country: String,
    postalCode: String,
    height: Number,
    weightHistory: [{ weight: Number, bfp: Number, date: Date }],
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
});

module.exports = mongoose.model('Person', PersonSchema);