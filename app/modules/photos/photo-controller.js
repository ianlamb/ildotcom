var logger = require('logger');
var PhotoProvider = require('./photo-provider');

module.exports = function(router) {
    'use strict';
    
    var photoProvider = new PhotoProvider();
    
    router.get('/albums', function(req, res) {
        photoProvider.getAlbums()
            .then(function(result) {
                logger.debug('photo controller - get albums');
                res.json(result);
            })
            .catch(function(err) {
                logger.warn('photo controller - failed to get albums', err);
                res.sendStatus(401);
            });
    });
};