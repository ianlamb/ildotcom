var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var WowProfileSchema = new Schema({
    created_at: Date,
    achievementPoints: Number,
    mounts: { numCollected: Number, numNotCollected: Number },
    pets: { numCollected: Number, numNotCollected: Number },
    characters: [{
        showcase: Boolean,
        lastModified: Date,
        name: String,
        realm: String,
        battlegroup: String,
        class: Number,
        race: Number,
        gender: Number,
        level: Number,
        achievementPoints: Number,
        thumbnail: String,
        totalHonorableKills: Number,
        feed: [{
            type: String,
            timestamp: Number,
            name: String,
            quantity: Number,
            itemId: Number,
            achievement: {
                id: Number,
                title: String,
                description: String,
                points: Number
            }
        }],
        achievements: {
            achievementsCompleted: [Number],
            achievementsCompletedTimestamp: [Number],
            criteria: [Number],
            criteriaCreated: [Number],
            criteriaQuantity: [Number],
            criteriaTimestamp: [Number]
        },
        pvp: {
            brackets: {
                "ARENA_BRACKET_2v2": {
                    slug: String,
                    rating: Number,
                    weeklyPlayed: Number,
                    weeklyWon: Number,
                    weeklyLost: Number,
                    seasonPlayed: Number,
                    seasonWon: Number,
                    seasonLost: Number
                },
                "ARENA_BRACKET_3v3": {
                    slug: String,
                    rating: Number,
                    weeklyPlayed: Number,
                    weeklyWon: Number,
                    weeklyLost: Number,
                    seasonPlayed: Number,
                    seasonWon: Number,
                    seasonLost: Number
                },
                "ARENA_BRACKET_5v5": {
                    slug: String,
                    rating: Number,
                    weeklyPlayed: Number,
                    weeklyWon: Number,
                    weeklyLost: Number,
                    seasonPlayed: Number,
                    seasonWon: Number,
                    seasonLost: Number
                },
                "ARENA_BRACKET_RBG": {
                    slug: String,
                    rating: Number,
                    weeklyPlayed: Number,
                    weeklyWon: Number,
                    weeklyLost: Number,
                    seasonPlayed: Number,
                    seasonWon: Number,
                    seasonLost: Number
                },
            }
        },
        progression: {
            raids: [{
                name: String,
                lfr: Number,
                normal: Number,
                heroic: Number,
                mythic: Number,
                id: Number,
                bosses: [{
                    id: Number,
                    name: String,
                    normalKills: Number,
                    normalTimestamp: Number
                }]
            }]
        },
        items: {
            averageItemLevel: Number,
            averageItemLevelEquipped: Number,
            head: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            neck: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            shoulder: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            back: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            chest: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            wrist: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            hands: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            waist: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            legs: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            feet: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            finger1: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            finger2: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            trinket1: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            trinket2: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            },
            mainHand: {
                id: Number,
                name: String,
                quality: Number,
                itemLevel: Number
            }
        }
    }]
}, { strict: true });

module.exports = mongoose.model('WowProfile', WowProfileSchema);