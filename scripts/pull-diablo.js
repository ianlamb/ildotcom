var mongoose = require('mongoose');
var app = require('../config/app');
var db = require('../config/db');
var request = require('request');
var DiabloProfile = require('../app/models/diablo-profile');

console.log('connecting to db...');
mongoose.connect(db.url);

var options = {
    uri: 'http://us.battle.net/api/d3/profile/' + app.d3.battleTag + '/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
console.log('making d3 api call...');
request(options, function(err, res, body) {
    if(!body) {
        console.log('request returned empty');
        mongoose.disconnect();
        return;
    }
    var data = JSON.parse(body);
    if(data) {
        console.log('received info for battletag: ' + data.battleTag);
        var profile = new DiabloProfile(data);
        console.log('saving profile...');
        profile.save(function(err) {
            if(err) {
                console.error(err);
            }
            console.log('d3 profile created');
            mongoose.disconnect();
            console.log('done');
        });
    } else {
        console.log('unexpected results...');
        mongoose.disconnect();
    }
}).on('error', function(e) {
    console.error(e.message);
    mongoose.disconnect();
});


