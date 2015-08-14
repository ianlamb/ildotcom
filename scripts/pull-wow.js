var app                 = require('../config/app');
var db                  = require('../config/db');
var mongoose            = require('mongoose');
var request             = require('request');
var achievements        = require('./achievements.json');
var WarcraftProvider    = require('../app/modules/gaming/warcraft/warcraft-provider');
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

function parseAchievementObject(supercats, character) {
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
        found[ach] = false;
    });

    // Lets parse out all the super categories and build out our structure
    supercats.forEach(parseSuperCat); 

    for (var achId in found) {
        if (found.hasOwnProperty(achId) && !found[achId]) {
            console.log('WARN: Found achievement "' + achId + '" from character but not in db.');
        }
    }

    // Add totals
    obj.possible = totalPossible;
    obj.completed = totalCompleted;

    // Data object we expose externally
    return obj;
    
    function parseSuperCat(supercat) {
        var possibleCount = 0;
        var completedCount = 0;
        
        // remove the "." to fix parsing errors
        if (supercat.name === "Player vs. Player") {
            supercat.name = "Player vs Player";
        }
    
        // Add the supercategory to the object, so we can do quick lookups on category
        obj[supercat.name] = {};
        obj[supercat.name].categories = [];
    
        supercat.cats.forEach(parseCat);
    
        obj[supercat.name].possible = possibleCount;
        obj[supercat.name].completed = completedCount;
    
        // Add the FoS count if this is the FoS
        if (supercat.name === 'Feats of Strength') {
            obj[supercat.name].foSTotal = totalFoS;
        } else if (supercat.name === 'Legacy') {
            obj[supercat.name].legacyTotal = totalLegacy;
        }
        
        function parseCat(cat) {
            var myCat = {'name': cat.name, 'zones': []};
        
            cat.zones.forEach(parseZone);
        
            // Add the category to the obj
            obj[supercat.name].categories.push(myCat);
            
            function parseZone(zone) {
                var myZone = {'name': zone.name, 'achievements': []};
        
                zone.achs.forEach(function(ach) {
        
                    // Mark this achievement in our found tracker
                    found[ach.id] = true;
        
                    var myAchievement = ach, added = false;
                    myAchievement.completed = completed[ach.id];
                    if (myAchievement.completed) {
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
            }
        }
    }
}