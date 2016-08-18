angular.module('app.games.warcraft')
    .factory('WowProfile', ['$http', function($http) {
        'use strict';

        var wowDataCache;
        var races = ['0', 'Human', 'Orc', '3', 'Night Elf', 'Undead', 'Tauren', 'Gnome', '8', '9', 'Blood Elf'];
        var classes = ['None', 'Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Death Knight', 'Shaman', 'Mage', 'Warlock', 'Monk', 'Druid', 'Demon Hunter'];
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

        return {
            get: function() {
                wowDataCache = wowDataCache || $http.get('/api/wow')
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
    
                        return wowProfile;
                    })
                    .error(function(err) {
                        console.error(err);
                    });

                return wowDataCache;
            }
        };
    }]);