module.exports = {
    'jwtTokenSecret': '******', // private secret used in the jwt token hashing
    'authSecret': '******', // password for logging in
    'tokenExpiry': 7 * 24 * 60 * 60 * 1000, // 7 days
    'keys': { // api keys provided by 3rd parties
        'flickr': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        'mapquest': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        'steam': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },
    'wow': {
        'battleTag': '',
        'characters': [
            { name: 'Jenkins', realm: 'Arthas', showcase: true },
            { name: 'Nova', realm: 'Arthas' },
            { name: 'Jaina', realm: 'Arthas' },
            { name: 'Uther', realm: 'Arthas' }
        ]
    },
    'd3': {
        'battleTag': 'BattleTag-xxxx'
    },
    'sc2': {
        'battleTag': 'BattleTag-xxxx',
        'id': 278997,
        'realm': 1,
        'name': 'BattleTag'
    }
};