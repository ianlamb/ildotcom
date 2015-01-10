var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DiabloProfileSchema = new Schema({
    'battleTag': String,
    'paragonLevel': Number,
    'paragonLevelHardcore': Number,
    'paragonLevelSeason': Number,
    'paragonLevelSeasonHardcore': Number,
    'heroes': [
        {
            'paragonLevel': Number,
            'seasonal': Boolean,
            'name': String,
            'id': Number,
            'level': Number,
            'hardcore': String,
            'gender': Number, // 0-1
            'dead': Boolean,
            'class': String,
            'last-updated': Number
        }
    ],
    'lastHeroPlayed': Number,
    'lastUpdated': Number,
    'kills': {
        'monsters': Number,
        'elites': Number,
        'hardcoreMonsters': Number
    },
    'highestHardcoreLevel': Number,
    'timePlayed': { // 0-1
        'barbarian': Number,
        'crusader': Number,
        'demon-hunter': Number,
        'monk': Number,
        'witch-doctor': Number,
        'wizard': Number
    },
    'progression': {
        'act1': Boolean,
        'act2': Boolean,
        'act3': Boolean,
        'act4': Boolean,
        'act5': Boolean
    },
    'fallenHeroes': [],
    'blacksmith': {
        'slug': String,
        'level': Number,
        'stepCurrent': Number,
        'stepMax': Number
    },
    'jeweler': {
        'slug': String,
        'level': Number,
        'stepCurrent': Number,
        'stepMax': Number
    },
    'mystic': {
        'slug': String,
        'level': Number,
        'stepCurrent': Number,
        'stepMax': Number
    },
    'blacksmithHardcore': {
        'slug': String,
        'level': Number,
        'stepCurrent': Number,
        'stepMax': Number
    },
    'jewelerHardcore': {
        'slug': String,
        'level': Number,
        'stepCurrent': Number,
        'stepMax': Number
    },
    'mysticHardcore': {
        'slug': String,
        'level': Number,
        'stepCurrent': Number,
        'stepMax': Number
    },
    'blacksmithSeason': {
        'slug': String,
        'level': Number,
        'stepCurrent': Number,
        'stepMax': Number
    },
    'jewelerSeason': {
        'slug': String,
        'level': Number,
        'stepCurrent': Number,
        'stepMax': Number
    },
    'mysticSeason': {
        'slug': String,
        'level': Number,
        'stepCurrent': Number,
        'stepMax': Number
    },
    'blacksmithSeasonHardcore': {
        'slug': String,
        'level': Number,
        'stepCurrent': Number,
        'stepMax': Number
    },
    'jewelerSeasonHardcore': {
        'slug': String,
        'level': Number,
        'stepCurrent': Number,
        'stepMax': Number
    },
    'mysticSeasonHardcore': {
        'slug': String,
        'level': Number,
        'stepCurrent': Number,
        'stepMax': Number
    },
    'seasonalProfiles': {
        'season0': {
            'seasonId': Number,
            'paragonLevel': Number,
            'paragonLevelHardcore': Number,
            'kills': {
                'monsters': Number,
                'elites': Number,
                'hardcoreMonsters': Number
            },
            'timePlayed': {
                'barbarian': Number,
                'crusader': Number,
                'demon-hunter': Number,
                'monk': Number,
                'witch-doctor': Number,
                'wizard': Number
            },
            'highestHardcoreLevel': Number,
            'progression': {
                'act1': Boolean,
                'act2': Boolean,
                'act3': Boolean,
                'act4': Boolean,
                'act5': Boolean
            }
        },
        'season1': {
            'seasonId': Number,
            'paragonLevel': Number,
            'paragonLevelHardcore': Number,
            'kills': {
                'monsters': Number,
                'elites': Number,
                'hardcoreMonsters': Number
            },
            'timePlayed': {
                'barbarian': Number,
                'crusader': Number,
                'demon-hunter': Number,
                'monk': Number,
                'witch-doctor': Number,
                'wizard': Number
            },
            'highestHardcoreLevel': Number,
            'progression': {
                'act1': Boolean,
                'act2': Boolean,
                'act3': Boolean,
                'act4': Boolean,
                'act5': Boolean
            }
        }
    }
});

module.exports = mongoose.model('DiabloProfile', DiabloProfileSchema);