require('app-module-path').addPath(__dirname + '/../app');

var app                 = require('config/app');
var db                  = require('config/db');
var mongoose            = require('mongoose');
var request             = require('request');
var achievements        = require('./sc2-achievements.json');
var StarcraftProvider   = require('modules/gaming/starcraft/starcraft-provider');
var starcraftProvider   = new StarcraftProvider();

console.log('connecting to database...');
mongoose.connect(db.url);

var options = {
    uri: app.battlenet.baseUrl + '/sc2/profile/' + app.sc2.id + '/' + app.sc2.realm + '/' + app.sc2.name + '/?locale=en_US&apikey=' + app.keys.battlenet,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

console.log('requesting sc2 profile...', options.uri);
request(options, function(err, res, body) {
    if(err) {
        console.err(err);
        mongoose.disconnect();
        return;
    }
    if(!body) {
        console.err('request returned empty');
        mongoose.disconnect();
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