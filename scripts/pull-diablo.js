var mongoose = require('mongoose');
var app = require('../config/app');
var db = require('../config/db');
var request = require('request');
var Promise = require('promise');
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
        var promises = [];
        for (var i = 0; i < profile.heroes.length; i++) {
            var promise = new Promise(function(resolve, reject) {
                var options = {
                    uri: 'http://us.battle.net/api/d3/profile/' + app.d3.battleTag + '/hero/' + profile.heroes[i].id,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                request(options, function(err, res, body) {
                    if(!body) {
                        console.log('request returned empty');
                        mongoose.disconnect();
                        return;
                    }
                    var data = JSON.parse(body);
                    if(data) {
                        console.log('received info for character: ' + data.name);
                        for (var j = 0; j < profile.heroes.length; j++) {
                            if(profile.heroes[j].id === data.id) {
                                profile.heroes[j].items = data.items;
                                profile.heroes[j].stats = data.stats;
                                break;
                            }
                        }
                        resolve(data);
                    } else {
                        console.log('unexpected results...');
                        reject('unexpected results...');
                    }
                }).on('error', function(e) {
                    console.error(e.message);
                    reject(e.message);
                });
            });
            promises.push(promise);
        }

        Promise.all(promises).then(function() {
            console.log('all requests complete, saving profile..');
            //console.log(profile);
            profile.save(function(err) {
                if(err) {
                    console.error(err);
                }
                console.log('d3 profile created');
                mongoose.disconnect();
                console.log('done');
            });
        }, function(err) {
            console.error(err);
            mongoose.disconnect();
        });
    } else {
        console.log('unexpected results...');
        mongoose.disconnect();
    }
}).on('error', function(e) {
    console.error(e.message);
    mongoose.disconnect();
});


