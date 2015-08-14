var app             = require('../config/app');
var db              = require('../config/db');
var mongoose        = require('mongoose');
var request         = require('request');
var DiabloProvider  = require('../app/modules/gaming/diablo/diablo-provider');
var diabloProvider  = new DiabloProvider();

console.log('connecting to database...');
mongoose.connect(db.url);

var options = {
    uri: 'http://us.battle.net/api/d3/profile/' + app.d3.battleTag + '/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

console.log('requesting d3 profile...');
request(options, function(err, res, body) {
    if(!body) {
        console.log('request returned empty');
        mongoose.disconnect();
        return;
    }
    var data = JSON.parse(body);
    diabloProvider.saveProfile(data)
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