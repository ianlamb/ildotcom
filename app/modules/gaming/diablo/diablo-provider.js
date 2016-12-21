var logger = require('logger');
var request = require('request');
var app = require('config/app.js');
var DiabloProfile = require('./diablo-profile-model');

module.exports = function() {
    'use strict';
    
    this.getProfile = function() {
        return new Promise(function(resolve, reject) {
            DiabloProfile.findOne({}, {}, { sort: { 'created_at': -1 }})
                .exec(function(err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
        });
    };
    
    this.saveProfile = function(data) {
        return new Promise(function(resolve, reject) {
            var profile = new DiabloProfile(data);
            var promises = [];
            profile.heroes.forEach(function(hero) {
                var promise = getHeroData(hero);
                promises.push(promise);
            });
    
            Promise.all(promises).then(function() {
                console.log('saving profile...');
                profile.save(function(err, res) {
                    if(err) {
                        reject(err);
                    }
                    resolve(res);
                });
            }, function(err) {
                console.error(err);
            });
        });
    };
    
    function getHeroData(hero) {
        return new Promise(function(resolve, reject) {
            var options = {
                uri: app.battlenet.baseUrl + '/d3/profile/' + app.d3.battleTag + '/hero/' + hero.id + '?locale=en_US&apikey=' + app.keys.battlenet,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            
            console.log('requesting hero data for %s...', hero.name);
            request(options, function(err, res, body) {
                if(err) {
                    reject(err);
                }
                if(!body) {
                    reject('request returned empty');
                }
                var data = JSON.parse(body);
                hero.items = data.items;
                hero.stats = data.stats;
                resolve(data);
            }).on('error', function(e) {
                console.error(e.message);
                reject(e.message);
            });
        });
    }
};