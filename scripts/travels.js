var db = require('../config/db');
var mongoose = require('mongoose');
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var http = require('http');
var https = require('https');
var request = require('request');
var querystring = require('querystring');

var Place = require('../app/models/place');
var Trip = require('../app/models/trip');

console.log('connecting to db...');
mongoose.connect(db.url);


// trips
var trip;
trip = {
    name: 'Cancun',
    slug: 'cancun',
    places: [
        {}
    ],
    startDate: '2014-03-03',
    endDate: '',
    photos: []
};





Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}
