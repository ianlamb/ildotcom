//var mongoose        = require('mongoose');
//var request         = require('request');
//var Promise         = require('promise');
//var config          = require('../../config/app');
//var db              = require('../../config/db');
//var Place           = require('../models/place');
//
//module.exports = {
//    geocodeLocation: function(locationSearch) {
//        'use strict';
//
//        return new Promise(function(resolve) {
//            console.log('geocoding...');
//            var options = {
//                uri: 'http://open.mapquestapi.com/geocoding/v1/address?key=' + config.keys.mapquest + '&location=' + locationSearch,
//                method: 'GET',
//                headers: {
//                    'Content-Type': 'application/json'
//                }
//            };
//            request(options, function(err, rez, body) {
//                if(!body) {
//                    console.log('request returned empty');
//                    mongoose.disconnect();
//                    return;
//                }
//                var data = JSON.parse(body);
//                if(data) {
//                    console.log('received geocode data');
//                    resolve(data.results);
//                } else {
//                    console.log('unexpected results...');
//                    mongoose.disconnect();
//                }
//            }).on('error', function(e) {
//                console.error(e.message);
//                mongoose.disconnect();
//            });
//        });
//    }
//};
