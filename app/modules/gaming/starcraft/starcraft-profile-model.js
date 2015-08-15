var mongoose     = require("mongoose");
var Schema       = mongoose.Schema;
var timestamp   = require("../../../middleware/timestamp.js");

var StarcraftProfileSchema = new Schema({
    "id": Number,
    "realm": Number,
    "displayName": String,
    "clanName": String,
    "clanTag": String,
    "profilePath": String,
    "portrait": {
        "x": Number,
        "y": Number,
        "w": Number,
        "h": Number,
        "offset": Number,
        "url": String
    },
    "career": {
        "primaryRace": String,
        "terranWins": Number,
        "protossWins": Number,
        "zergWins": Number,
        "highest1v1Rank": String,
        "highestTeamRank": String,
        "seasonTotalGames": Number,
        "careerTotalGames": Number
    },
    "swarmLevels": {
        "level": Number,
        "terran": {
            "level": Number,
            "totalLevelXP": Number,
            "currentLevelXP": Number
        },
        "zerg": {
            "level": Number,
            "totalLevelXP": Number,
            "currentLevelXP": Number
        },
        "protoss": {
            "level": Number,
            "totalLevelXP": Number,
            "currentLevelXP": Number
        }
    },
    "campaign": {
        "wol": String,
        "hots": String
    },
    "season": {
        "seasonId": Number,
        "seasonNumber": Number,
        "seasonYear": Number,
        "totalGamesThisSeason": Number
    },
    "rewards": {
        "selected": [Number],
        "earned": [Number]
    },
    "achievements": {
        "points": {
            "totalPoints": Number,
            "categoryPoints": {
                "4325377": Number,
                "4325379": Number,
                "4325380": Number,
                "4325382": Number,
                "4325408": Number,
                "4325410": Number
            }
        },
        "achievements": [
            {
                "achievementId": Number,
                "completionDate": Number
            }
        ]
    },
    "created_at": Date,
    "updated_at": Date
}).pre('save', timestamp);

module.exports = mongoose.model('StarcraftProfile', StarcraftProfileSchema);