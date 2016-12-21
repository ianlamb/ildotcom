var logger = require('logger');
var config = require('config/app');
var Dropbox = require('dropbox');
var dbx = new Dropbox({ accessToken: config.keys.dropbox });

module.exports = function() {
    'use strict';
    
    this.getAlbums = function() {
        return new Promise(function(resolve, reject) {
            dbx.filesListFolder({path: '/photos'})
                .then(function(res) {
                    console.log(res);

                    var albums = [];
                    res.entries.forEach(function(entry) {
                        if (entry['.tag'] === 'folder') {
                            albums.push({
                                name: entry.name,
                                path: entry.path_lower
                            });
                        }
                    });

                    resolve({
                        albums: albums
                    });
                })
                .catch(function(err) {
                    console.log(err);
                });
        });
    };
};