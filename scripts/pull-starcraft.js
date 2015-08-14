var app = require('../config/app');
var db              = require('../config/db');
var mongoose        = require('mongoose');
var request = require('request');
var StarcraftProvider = require('../app/modules/gaming/starcraft/starcraft-provider');
var starcraftProvider = new StarcraftProvider();

console.log('connecting to database...');
mongoose.connect(db.url);

var options = {
    uri: 'http://us.battle.net/api/sc2/profile/' + app.sc2.id + '/' + app.sc2.realm + '/' + app.sc2.name + '/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

console.log('requesting sc2 profile...');
request(options, function(err, res, body) {
    if(!body) {
        console.log('request returned empty');
        return;
    }
    var data = JSON.parse(body);
    starcraftProvider.saveProfile(data)
        .then(function(res) {
            console.log('profile saved');
            mongoose.disconnect();
        })
        .catch(function(err) {
            console.err(err);
            mongoose.disconnect();
        });
}).on('error', function(e) {
    console.error(e.message);
    mongoose.disconnect();
});