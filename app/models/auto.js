var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Photo        = require('./photo');

var AutoSchema = new Schema({
    type: String,
    year: Number,
    make: String,
    model: String,
    trim: String,
    class: String,
    dateOfPurchase: Date,
    dateOfSale: Date,
    price: Number,
    odometer: { atPurchase: Number, latest: Number },
    horsepower: { hp: Number, rpm: Number },
    torque: { tq: Number, rpm: Number },
    fuelEconomy: { city: Number, highway: Number },
    engine: String,
    displacement: String,
    transmission: String,
    driveType: String,
    finalDrive: String,
    fuelSystem: String,
    compression: String,
    curbWeight: Number,
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
});

module.exports = mongoose.model('Auto', AutoSchema);