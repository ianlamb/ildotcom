var mongoose = require('mongoose');
var app = require('../config/app');
var db = require('../config/db');
var request = require('request');
var Promise = require('promise');
var WowProfile = require('../app/models/wow-profile');

console.log('connecting to db...');
mongoose.connect(db.url);

var profile = new WowProfile();
var promises = [];
app.wow.characters.forEach(function(character) {
    var promise = new Promise(function(resolve) {
        console.log('making wow api call...');
        var options = {
            uri: 'http://us.battle.net/api/wow/character/' + character.realm + '/' + character.name,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if(character.showcase) {
            // just ensure we only pull these once, all characters return account-wide pets and mounts
            options.uri +=  '?fields=feed,items,pvp,progression,pets,mounts,achievements';
        }
        request(options, function(err, res, body) {
            if(!body) {
                console.log('request returned empty');
                mongoose.disconnect();
                return;
            }
            var data = JSON.parse(body);
            if(data) {
                console.log('received info for character: ' + data.name);
                if(character.showcase) {
                    profile.achievementPoints = data.achievementPoints;
                    profile.pets = data.pets;
                    profile.mounts = data.mounts;
                    data.showcase = true;
                }
                profile.characters.push(data);
                resolve(data);
            } else {
                console.log('unexpected results...');
                mongoose.disconnect();
            }
        }).on('error', function(e) {
            console.error(e.message);
            mongoose.disconnect();
        });
    });
    promises.push(promise);
});

Promise.all(promises).then(function() {
    console.log('all requests complete, saving profile..');
    profile.created_at = new Date();
    profile.save(function(err) {
        if(err) {
            console.error(err);
        }
        console.log('wow profile created');
        mongoose.disconnect();
        console.log('done');
    });
});