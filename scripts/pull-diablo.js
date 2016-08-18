require('app-module-path').addPath(__dirname + '/../app');

var app             = require('config/app');
var db              = require('config/db');
var mongoose        = require('mongoose');
var request         = require('request');
var DiabloProvider  = require('modules/gaming/diablo/diablo-provider');
var diabloProvider  = new DiabloProvider();

console.log('connecting to database...');
mongoose.connect(db.url);

var options = {
    uri: app.battlenet.baseUrl + '/d3/profile/' + app.d3.battleTag + '/?locale=en_US&apikey=' + app.keys.battlenet,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

console.log('requesting d3 profile...', options.uri);
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