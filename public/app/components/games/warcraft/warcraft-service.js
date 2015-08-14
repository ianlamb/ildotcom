angular.module('app.games.warcraft')
    .factory('WowProfile', ['$http', function($http) {
        'use strict';

        var races = ['0', '1', 'Orc', '3', '4', 'Undead', '6', '7', '8', '9', 'Blood Elf'];
        var classes = ['0', 'Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Death Knight', '7', '8', 'Warlock'];
        var genders = ['Male', 'Female'];
        var itemSlots = {
            'head': 'Head',
            'neck': 'Neck',
            'shoulder': 'Shoulder',
            'back': 'Back',
            'chest': 'Chest',
            'wrist': 'Wrist',
            'hands': 'Hands',
            'waist': 'Waist',
            'legs': 'Legs',
            'feet': 'Feet',
            'finger1': 'Finger 1',
            'finger2': 'Finger 2',
            'trinket1': 'Trinket 1',
            'trinket2': 'Trinket 2',
            'mainHand': 'Main Hand',
            'offHand': 'Off-Hand'
        };

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
            angular.forEach(character.achievements.achievementsCompleted, function(ach, index) {
                // hash the achievement and its timestamp
                completed[ach] = character.achievements.achievementsCompletedTimestamp[index];
                found[ach] = false;
            });

            // Lets parse out all the super categories and build out our structure
            angular.forEach(supercats, function(supercat) {
                var possibleCount = 0;
                var completedCount = 0;

                // Add the supercategory to the object, so we can do quick lookups on category
                obj[supercat.name] = {};
                obj[supercat.name].categories = [];

                angular.forEach(supercat.cats, function(cat) {
                    var myCat = {'name': cat.name, 'zones': []};

                    angular.forEach(cat.zones, function(zone) {
                        var myZone = {'name': zone.name, 'achievements': []};

                        angular.forEach(zone.achs, function(ach) {

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
                    });

                    // Add the category to the obj
                    obj[supercat.name].categories.push(myCat);
                });

                obj[supercat.name].possible = possibleCount;
                obj[supercat.name].completed = completedCount;

                // Add the FoS count if this is the FoS
                if (supercat.name === 'Feats of Strength') {
                    obj[supercat.name].foSTotal = totalFoS;
                } else if (supercat.name === 'Legacy') {
                    obj[supercat.name].legacyTotal = totalLegacy;
                }
            }); 


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
        }

        return {
            get: function() {
                return $http.get('/api/wow')
                .success(function(wowProfile) {
                    wowProfile.alts = [];
                    wowProfile.characters.sort(function(a, b) {
                        return parseInt(a.level) < parseInt(b.level);
                    }).forEach(function(character) {
                        // format some properties
                        character.gender = genders[character.gender];
                        character.class = classes[character.class];
                        character.race = races[character.race];

                        // handle main/alts
                        if(character.showcase) {
                            if(wowProfile.main) {
                                console.error('multiple characters marked as showcase');
                            } else {
                                wowProfile.main = character;

                                // determine best raid progression
                                wowProfile.main.progression.raids.forEach(function(raid) {
                                    if(raid.lfr > 0) {
                                        wowProfile.main.progression.best = raid.name + " (LFR)";
                                    }
                                });
                                wowProfile.main.progression.raids.forEach(function(raid) {
                                    if(raid.normal > 0) {
                                        wowProfile.main.progression.best = raid.name + " (Normal)";
                                    }
                                });
                                wowProfile.main.progression.raids.forEach(function(raid) {
                                    if(raid.heroic > 0) {
                                        wowProfile.main.progression.best = raid.name + " (Heroic)";
                                    }
                                });
                                wowProfile.main.progression.raids.forEach(function(raid) {
                                    if(raid.mythic > 0) {
                                        wowProfile.main.progression.best = raid.name + " (Mythic)";
                                    }
                                });

                                // declare the slot names for each item
                                for (var item in wowProfile.main.items) {
                                    // linter is finnicky about this enforcement, so it has to be its own if block
                                    if (!item.hasOwnProperty) {
                                        continue;
                                    }
                                    if (!itemSlots[item]) {
                                        continue;
                                    }
                                    wowProfile.main.items[item].slot = itemSlots[item];
                                }

                                // TODO: parse feed items
                            }
                        } else {
                            wowProfile.alts.push(character);
                        }
                    });

                    // needed to calculate percentages
                    wowProfile.mounts.possible = wowProfile.mounts.numCollected + wowProfile.mounts.numNotCollected;
                    wowProfile.pets.possible = wowProfile.pets.numCollected + wowProfile.pets.numNotCollected;

                    // handle achievements
                    $http.get('assets/data/achievements.json', { cache: true })
                        .then(function(data) {
                            wowProfile.achievements = parseAchievementObject(data.data.supercats, wowProfile.main);
                        });

                    return wowProfile;
                })
                .error(function(err) {
                    console.error(err);
                });
            }
        };
    }]);