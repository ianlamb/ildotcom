var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TripSchema = new Schema({
    name: String,
    startDate: Date,
    endDate: Date,
    pointsOfInterest: [
        {
            name: String,
            url: String
        }
    ],
    places: [{ type: Schema.Types.ObjectId, ref: 'Place' }],
    photos: [
        {
            title: String,
            url: String,
            thumb: String
        }
    ],
    created_at: Date,
    modified_at: Date
});

module.exports = mongoose.model('Trip', TripSchema);