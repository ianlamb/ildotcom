var db = require('../config/db');
var mongoose = require('mongoose');
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var http = require('http');
var https = require('https');
var request = require('request');
var querystring = require('querystring');

var Photo = require('../app/models/photo');
var Auto = require('../app/models/auto');

console.log('connecting to db...');
mongoose.connect(db.url);

var autos = [
    {
        type: 'car',
        year: 2000,
        make: 'Ford',
        model: 'Mustang',
        trim: 'Coupe',
        class: 'Pony',
        dateOfPurchase: new Date('2010-04-31'),
        dateOfSale: null,
        price: 3800,
        odometer: { atPurchase: 150000, latest: 165000 },
        horsepower: { hp: 190, rpm: 5250 },
        torque: { tq: 220, rpm: 2750 },
        fuelEconomy: { city: 13, highway: 9.4 },
        displacement: '3.8L',
        engine: 'V6',
        transmission: '4-speed Automatic',
        driveType: 'Rear wheel drive',
        finalDrive: '3.27',
        curbWeight: 3064,
        photos: [{ file: 'h6led.jpg' }]
    },
    {
        type: 'motorcycle',
        year: 2002,
        make: 'Suzuki',
        model: 'GS500',
        trim: '',
        class: 'Naked',
        dateOfPurchase: new Date('2011-05-01'),
        dateOfSale: null,
        price: 2500,
        odometer: { atPurchase: 29000, latest: 35000 },
        horsepower: { hp: 46.64, rpm: 9500 },
        torque: { tq: 29.5, rpm: 7400 },
        fuelEconomy: { city: 5.1, highway: 4.2 },
        displacement: '487cc',
        engine: 'V-Twin, four-stroke',
        transmission: '6-speed',
        fuelSystem: 'Carburettor',
        compression: '9.0:1',
        curbWeight: 173,
        photos: [{ file: 'ZG1LC.jpg' }]
    },
    {
        type: 'car',
        year: 2013,
        make: 'Honda',
        model: 'Accord',
        trim: 'Sport',
        class: 'Sedan',
        dateOfPurchase: new Date('2012-12-31'),
        dateOfSale: new Date('2014-06-20'),
        price: 31459,
        odometer: { atPurchase: 13, latest: 16998 },
        horsepower: { hp: 189, rpm: 6400 },
        torque: { tq: 182, rpm: 3900 },
        fuelEconomy: { city: 9.8, highway: 6.9 },
        displacement: '2.4L',
        engine: 'Inline 4',
        transmission: '6-speed Manual',
        driveType: 'Front wheel drive',
        finalDrive: '4.10',
        curbWeight: 1486,
        photos: [{ file: 'cxs63.jpg' }]
    },
    {
        type: 'motorcycle',
        year: 2008,
        make: 'Honda',
        model: 'CBR600',
        trim: 'RR',
        class: 'Supersport',
        dateOfPurchase: new Date('2014-04-31'),
        dateOfSale: null,
        price: 7500,
        odometer: { atPurchase: 9000, latest: 15000 },
        horsepower: { hp: 106.3, rpm: 13100 },
        torque: { tq: 44.9, rpm: 11300 },
        fuelEconomy: { city: 6.5, highway: 5.0 },
        displacement: '599cc',
        engine: 'Inline 4, four-stroke',
        transmission: '6-speed',
        fuelSystem: 'Fuel Injected',
        compression: '12.2:1',
        curbWeight: 186,
        photos: [{ file: 'cbr600rr.jpg' }]
    },
];

autos.forEach(function(auto) {
    createAuto(auto);
});

function createAuto(auto) {
    var photos = [];
    if(auto.photos) {
        for(var i = 0; i < auto.photos.length; i++) {
            Photo.create(auto.photos[i], function(err, photo) {
                if (err) console.log(err);
                photos.push(photo._id);
            });
        }
    }
    setTimeout(function() {
        auto.photos = photos;
        Auto.create(auto, function(err, a) {
            if (err) console.log(err);
            console.log('Created Auto: ' + a._id);
        });
    }, 500);
}



Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}
