require('app-module-path').addPath(__dirname + '/../app');

var app            = require('config/app');
var db             = require('config/db');
var mongoose       = require('mongoose');
var request        = require('request');
var cheerio        = require('cheerio');
var HotsProvider   = require('modules/gaming/hots/hots-provider');
var hotsProvider   = new HotsProvider();

console.log('connecting to database...');
mongoose.connect(db.url);

var options = {
    uri: 'https://www.hotslogs.com/Player/Profile?PlayerID=' + app.hots.playerId,
    method: 'GET'
};

console.log('scraping hotslogs...');
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
    
    var $ = cheerio.load(body);
    var profile = {};
    var row, text;
    
    $('.tableGeneralInformation').filter(function() {
        var data = $(this);
        
        // hero league
        row = data.children().children().first();
        text = row.children().last().text();
        profile.heroLeague = {
            league: text.split(' ')[0].trim(),
            mmr: parseInt(text.split('MMR: ')[1].split(')')[0])
        };
        
        // quickmatch
        row = row.next();
        text = row.children().last().text();
        profile.quickMatch = {
            league: text.split(' ')[0].trim(),
            mmr: parseInt(text.split('MMR: ')[1].split(')')[0])
        };
        
        // combined hero level
        row = row.next();
        text = row.children().last().text();
        profile.combinedHeroLevel = parseInt(text);
        
        // games played
        row = row.next();
        text = row.children().last().text();
        profile.totalGamesPlayed = parseInt(text);
        
        console.log(profile);
    });
    
    hotsProvider.saveProfile(profile)
        .then(function(res) {
            console.log('profile saved');
            mongoose.disconnect();
        })
        .catch(function(err) {
            console.err(err);
            mongoose.disconnect();
        });
}).on('error', function(e) {
    console.error(e.message);
    mongoose.disconnect();
});