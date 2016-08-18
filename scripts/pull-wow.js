require('app-module-path').addPath(__dirname + '/../app');

var app                 = require('config/app');
var db                  = require('config/db');
var mongoose            = require('mongoose');
var request             = require('request');
var Promise             = require('promise');
var achievements        = require('./wow-achievements.json');
var WarcraftProvider    = require('modules/gaming/warcraft/warcraft-provider');
var warcraftProvider    = new WarcraftProvider();

console.log('connecting to db...');
mongoose.connect(db.url);

var profile = {
    "characters": []
};
var promises = [];
app.wow.characters.forEach(function(character) {
    var promise = new Promise(function(resolve) {
        var options = {
            uri: 'http://us.battle.net/api/wow/character/' + character.realm + '/' + character.name,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if(character.showcase) {
            // just ensure we only pull these once, all characters return account-wide pets and mounts
            options.uri +=  '?fields=feed,items,stats,pvp,progression,pets,mounts,achievements';
        }
        
        console.log('requesting character data for %s...', character.name);
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
            if(data) {
                console.log('received info for character: ' + data.name);
                if(character.showcase) {
                    profile.achievementPoints = data.achievementPoints;
                    profile.pets = data.pets;
                    profile.mounts = data.mounts;
                    profile.achievements = parseAchievementObject(achievements.supercats, data);
                    data.showcase = true;
                    parseFeed(data.feed).then(function(feed) {
                        data.feed = feed;
                        profile.characters.push(data);
                        resolve(data);
                    });
                } else {
                    profile.characters.push(data);
                    resolve(data);
                }
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
    console.log('saving profile...');
    warcraftProvider.saveProfile(profile)
        .then(function(res) {
            console.log('profile saved');
            mongoose.disconnect();
        })
        .catch(function(err) {
            console.err(err);
            mongoose.disconnect();
        });
});

function parseFeed(feed) {
    return new Promise(function(resolve, reject){
        var promises = [];
        feed.forEach(function(feedItem) {
            if (feedItem.type === "LOOT") {
                var promise = new Promise(function(resolve, reject) {
                    getItemData(feedItem.itemId).then(function(itemData) {
                        feedItem.item = itemData;
                        resolve();
                    });
                });
                promises.push(promise);
            }
        });
        
        Promise.all(promises).then(function() {
            console.log('finished parsing activity feed...');
            resolve(feed);
        });
    });
}

function getItemData(itemId, context) {
    return new Promise(function(resolve, reject) {
        var options = {
            uri: 'http://us.battle.net/api/wow/item/' + itemId,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (context) {
            options.uri += '/' + context;
        }
        
        console.log('requesting item data for %s...', itemId);
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
            if(data) {
                if (!data.name) {
                    if (data.availableContexts) {
                        console.log('require a context for item %s...', data.id);
                        getItemData(itemId, data.availableContexts[0]).then(function(itemData) {
                            resolve(itemData);
                        });
                    } else {
                        console.warn('couldn\'t retrieve data for item %s...', itemId);
                        reject();
                    }
                } else {
                    console.log('received info for item %s...', data.name);
                    resolve(data);
                }
            } else {
                console.log('unexpected results...');
                mongoose.disconnect();
            }
        });
    });
}

function parseAchievementObject(supercats, character) {
    var FAKE_COMPLETION_TIME = new Date('2015-01-01').getTime();
    var IGNORE_ACHIEVEMENTS = 
    {
        10050: true, // learn a primary prof
        10051: true  // learn two primary prof
    };
    
    var obj = {};
    var completed = {};
    var totalPossible = 0;
    var totalCompleted = 0;
    var totalFoS = 0;
    var totalLegacy = 0;
    var found = {};
    console.log('Parsing achievements.json...');

    // Build up lookup for achievements that character has completed
    character.achievements.achievementsCompleted.forEach(function(ach, index) {
        // hash the achievement and its timestamp
        completed[ach] = character.achievements.achievementsCompletedTimestamp[index];
        
        // FoS will no longer have timestamps, so we need to fake their timestamp
        if (!character.achievements.achievementsCompletedTimestamp[index])
        {
            completed[ach] = FAKE_COMPLETION_TIME;
        }
        found[ach] = false;
    });

    // Lets parse out all the super categories and build out our structure
    supercats.forEach(function(supercat) {
        var possibleCount = 0;
        var completedCount = 0;
        
        // remove the "." to fix parsing errors
        if (supercat.name === "Player vs. Player") {
            supercat.name = "Player vs Player";
        }

        // Add the supercategory to the object, so we can do quick lookups on category
        obj[supercat.name] = {};
        obj[supercat.name].categories = [];

        supercat.cats.forEach(function(cat) {
            var myCat = {'name': cat.name, 'zones': []};

            cat.zones.forEach(function(zone) {
                var myZone = {'name': zone.name, 'achievements': []};

                zone.achs.forEach(function(ach) {

                    // Mark this achievement in our found tracker
                    found[ach.id] = true;

                    var myAchievement = ach, added = false;
                    myAchievement.completed = completed[ach.id];
                    if (myAchievement.completed) {
                        myAchievement.rel = 'who=' + character.name + '&when=' + myAchievement.completed;
                    }                

                    // Hack: until blizz fixes api, don't stamp with date
                    if (myAchievement.completed && myAchievement.completed !== FAKE_COMPLETION_TIME) {
                        myAchievement.rel = 'who=' + character.name + '&when=' + myAchievement.completed;
                    }

                    // Always add it if we've completed it, it should show up regardless if its avaiable
                    if (completed[ach.id]) {
                        added = true;
                        myZone.achievements.push(myAchievement);    

                        // if this is feats of strength then I want to keep a seperate count for that 
                        // since its not a percentage thing
                        if (supercat.name === 'Feats of Strength') {
                            totalFoS++;
                        } else if (supercat.name === 'Legacy') {
                            totalLegacy++;
                        }
                    }

                    // Update counts proper
                    if (supercat.name !== 'Feats of Strength' && supercat.name !== 'Legacy' && ach.obtainable && 
                        (ach.side === '' || ach.side === character.faction)){
                        possibleCount++;
                        totalPossible++;

                        if (completed[ach.id]) {
                            completedCount++;
                            totalCompleted++;
                        }

                        // if we haven't already added it, then this is one that should show up in the page of achievements
                        // so add it
                        if (!added) {
                            myZone.achievements.push(myAchievement);
                        }
                    }
                });

                if (myZone.achievements.length > 0) {
                    myCat.zones.push(myZone);
                }
            });

            // Add the category to the obj
            obj[supercat.name].categories.push(myCat);
        });

        obj[supercat.name].possible = possibleCount;
        obj[supercat.name].completed = completedCount;

        // Add the FoS count if this is the FoS
        if (supercat.name === 'Feats of Strength') {
            obj[supercat.name].fosTotal = totalFoS;
        } else if (supercat.name === 'Legacy') {
            obj[supercat.name].legacyTotal = totalLegacy;
        }
    }); 

    for (var achId in found) {
        if (found.hasOwnProperty(achId) && !found[achId] && !IGNORE_ACHIEVEMENTS[achId]) {
            console.log('WARN: Found achievement "' + achId + '" from character but not in db.');
        }
    }

    // Add totals
    obj.possible = totalPossible;
    obj.completed = totalCompleted;

    // Data object we expose externally
    return obj;
}