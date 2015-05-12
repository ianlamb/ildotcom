var mongoose     = require("mongoose");
var Schema       = mongoose.Schema;

var DiabloProfileSchema = new Schema({
    "battleTag": String,
    "paragonLevel": Number,
    "paragonLevelHardcore": Number,
    "paragonLevelSeason": Number,
    "paragonLevelSeasonHardcore": Number,
    "heroes": [
        {
            "paragonLevel": Number,
            "seasonal": Boolean,
            "name": String,
            "id": Number,
            "level": Number,
            "hardcore": String,
            "gender": Number, // 0-1
            "dead": Boolean,
            "class": String,
            "last-updated": Number,
            "items": {
                "head": {
                    "id": String,
                    "name": String,
                    "icon": String,
                    "displayColor": String,
                    "tooltipParams": String
                },
                "torso": {
                    "id": String,
                    "name": String,
                    "icon": String,
                    "displayColor": String,
                    "tooltipParams": String
                },
                "feet": {
                    "id": String,
                    "name": String,
                    "icon": String,
                    "displayColor": String,
                    "tooltipParams": String
                },
                "hands": {
                    "id": String,
                    "name": String,
                    "icon": String,
                    "displayColor": String,
                    "tooltipParams": String
                },
                "shoulders": {
                    "id": String,
                    "name": String,
                    "icon": String,
                    "displayColor": String,
                    "tooltipParams": String
                },
                "legs": {
                    "id": String,
                    "name": String,
                    "icon": String,
                    "displayColor": String,
                    "tooltipParams": String
                },
                "bracers": {
                    "id": String,
                    "name": String,
                    "icon": String,
                    "displayColor": String,
                    "tooltipParams": String
                },
                "mainHand": {
                    "id": String,
                    "name": String,
                    "icon": String,
                    "displayColor": String,
                    "tooltipParams": String
                },
                "waist": {
                    "id": String,
                    "name": String,
                    "icon": String,
                    "displayColor": String,
                    "tooltipParams": String
                },
                "rightFinger": {
                    "id": String,
                    "name": String,
                    "icon": String,
                    "displayColor": String,
                    "tooltipParams": String
                },
                "leftFinger": {
                    "id": String,
                    "name": String,
                    "icon": String,
                    "displayColor": String,
                    "tooltipParams": String
                },
                "neck": {
                    "id": String,
                    "name": String,
                    "icon": String,
                    "displayColor": String,
                    "tooltipParams": String
                }
            },
            "stats": {
                "life": Number,
                "damage": Number,
                "toughness": Number,
                "healing": Number,
                "attackSpeed": Number,
                "armor": Number,
                "strength": Number,
                "dexterity": Number,
                "vitality": Number,
                "intelligence": Number,
                "physicalResist": Number,
                "fireResist": Number,
                "coldResist": Number,
                "lightningResist": Number,
                "poisonResist": Number,
                "arcaneResist": Number,
                "critDamage": Number,
                "blockChance": Number,
                "blockAmountMin": Number,
                "blockAmountMax": Number,
                "damageIncrease": Number,
                "critChance": Number,
                "damageReduction": Number,
                "thorns": Number,
                "lifeSteal": Number,
                "lifePerKill": Number,
                "goldFind": Number,
                "magicFind": Number,
                "lifeOnHit": Number,
                "primaryResource": Number,
                "secondaryResource": Number
            },
        }
    ],
    "lastHeroPlayed": Number,
    "lastUpdated": Number,
    "kills": {
        "monsters": Number,
        "elites": Number,
        "hardcoreMonsters": Number
    },
    "highestHardcoreLevel": Number,
    "timePlayed": { // 0-1
        "barbarian": Number,
        "crusader": Number,
        "demon-hunter": Number,
        "monk": Number,
        "witch-doctor": Number,
        "wizard": Number
    },
    "progression": {
        "act1": Boolean,
        "act2": Boolean,
        "act3": Boolean,
        "act4": Boolean,
        "act5": Boolean
    },
    "fallenHeroes": [],
    "blacksmith": {
        "slug": String,
        "level": Number,
        "stepCurrent": Number,
        "stepMax": Number
    },
    "jeweler": {
        "slug": String,
        "level": Number,
        "stepCurrent": Number,
        "stepMax": Number
    },
    "mystic": {
        "slug": String,
        "level": Number,
        "stepCurrent": Number,
        "stepMax": Number
    },
    "blacksmithHardcore": {
        "slug": String,
        "level": Number,
        "stepCurrent": Number,
        "stepMax": Number
    },
    "jewelerHardcore": {
        "slug": String,
        "level": Number,
        "stepCurrent": Number,
        "stepMax": Number
    },
    "mysticHardcore": {
        "slug": String,
        "level": Number,
        "stepCurrent": Number,
        "stepMax": Number
    },
    "blacksmithSeason": {
        "slug": String,
        "level": Number,
        "stepCurrent": Number,
        "stepMax": Number
    },
    "jewelerSeason": {
        "slug": String,
        "level": Number,
        "stepCurrent": Number,
        "stepMax": Number
    },
    "mysticSeason": {
        "slug": String,
        "level": Number,
        "stepCurrent": Number,
        "stepMax": Number
    },
    "blacksmithSeasonHardcore": {
        "slug": String,
        "level": Number,
        "stepCurrent": Number,
        "stepMax": Number
    },
    "jewelerSeasonHardcore": {
        "slug": String,
        "level": Number,
        "stepCurrent": Number,
        "stepMax": Number
    },
    "mysticSeasonHardcore": {
        "slug": String,
        "level": Number,
        "stepCurrent": Number,
        "stepMax": Number
    },
    "seasonalProfiles": {
        "season0": {
            "seasonId": Number,
            "paragonLevel": Number,
            "paragonLevelHardcore": Number,
            "kills": {
                "monsters": Number,
                "elites": Number,
                "hardcoreMonsters": Number
            },
            "timePlayed": {
                "barbarian": Number,
                "crusader": Number,
                "demon-hunter": Number,
                "monk": Number,
                "witch-doctor": Number,
                "wizard": Number
            },
            "highestHardcoreLevel": Number,
            "progression": {
                "act1": Boolean,
                "act2": Boolean,
                "act3": Boolean,
                "act4": Boolean,
                "act5": Boolean
            }
        },
        "season1": {
            "seasonId": Number,
            "paragonLevel": Number,
            "paragonLevelHardcore": Number,
            "kills": {
                "monsters": Number,
                "elites": Number,
                "hardcoreMonsters": Number
            },
            "timePlayed": {
                "barbarian": Number,
                "crusader": Number,
                "demon-hunter": Number,
                "monk": Number,
                "witch-doctor": Number,
                "wizard": Number
            },
            "highestHardcoreLevel": Number,
            "progression": {
                "act1": Boolean,
                "act2": Boolean,
                "act3": Boolean,
                "act4": Boolean,
                "act5": Boolean
            }
        }
    },
    "created_at": Date,
    "updated_at": Date
}).pre('save', function(next) {
    'use strict';

    var now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('DiabloProfile', DiabloProfileSchema);