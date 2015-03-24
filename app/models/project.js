var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProjectSchema = new Schema({
    name: String,
    slug: String,
    desc: String,
    url: String,
    repo: String,
    technologies: [String],
    images: [String],
    created_at: Date,
    updated_at: Date
}).pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('Project', ProjectSchema);