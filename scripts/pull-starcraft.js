var mongoose = require('mongoose');
var app = require('../config/app');
var db = require('../config/db');
var request = require('request');
var StarcraftProfile = require('../app/modules/gaming//starcraft-profile-model');

console.log('connecting to db...');
mongoose.connect(db.url);

var options = {
    uri: 'http://us.battle.net/api/sc2/profile/' + app.sc2.id + '/' + app.sc2.realm + '/' + app.sc2.name + '/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
console.log('making sc2 api call...');
request(options, function(err, res, body) {
    if(!body) {
        console.log('request returned empty');
        mongoose.disconnect();
        return;
    }
    var data = JSON.parse(body);
    if(data) {
        console.log('received info for: ' + data.displayName);
        var profile = new StarcraftProfile(data);
        console.log('saving profile...');
        profile.save(function(err) {
            if(err) {
                console.error(err);
            }
            console.log('sc2 profile created');
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


