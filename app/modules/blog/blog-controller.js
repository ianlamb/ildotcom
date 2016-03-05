var logger = require('logger');
var auth = require('middleware/auth');
var BlogProvider = require('./blog-provider');

module.exports = function(router) {
    'use strict';
    
    var blogProvider = new BlogProvider();
    
    router.get('/posts', function(req, res) {
        blogProvider.getPosts(req.query.limit)
            .then(function(result) {
                logger.info('get blog posts');
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.get('/post', function(req, res) {
        blogProvider.getPost()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.get('/post/:slug', function(req, res) {
        var searchCriteria = {};
        if (req.params.slug) {
            searchCriteria.slug = req.params.slug;
        }
        blogProvider.getPost(searchCriteria)
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.put('/post', auth, function(req, res) {
        blogProvider.savePost(req.body)
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
    
    router.delete('/post/:id', auth, function(req, res) {
        blogProvider.deletePost(req.params.id)
            .then(function() {
                res.send(200);
            })
            .catch(function(err) {
                res.send(err);
            });
    });
};