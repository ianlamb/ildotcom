var logger = require('logger');
var auth = require('middleware/auth');
var BlogProvider = require('./blog-provider');

module.exports = function(router) {
    'use strict';
    
    var blogProvider = new BlogProvider();
    
    router.get('/posts', function(req, res) {
        var searchCriteria = {};
        var limit = req.query.limit;
        if (!req.loggedIn) {
            searchCriteria.published = true;
        }
        blogProvider.getPosts(searchCriteria, limit)
            .then(function(result) {
                logger.debug('blog controller - get posts');
                res.json(result);
            })
            .catch(function(err) {
                logger.error('blog controller - can\'t get blog posts', err);
                res.send(err);
            });
    });
    
    router.get('/post', function(req, res) {
        var searchCriteria = {};
        if (!req.loggedIn) {
            searchCriteria.published = true;
        }
        blogProvider.getPost(searchCriteria)
            .then(function(result) {
                logger.debug('blog controller - get post');
                res.json(result);
            })
            .catch(function(err) {
                logger.error('blog controller - can\'t get blog post', err);
                res.send(err);
            });
    });
    
    router.get('/post/:slug', function(req, res) {
        var searchCriteria = {};
        if (req.params.slug) {
            searchCriteria.slug = req.params.slug;
        }
        if (!req.loggedIn) {
            searchCriteria.published = true;
        }
        blogProvider.getPost(searchCriteria)
            .then(function(result) {
                logger.debug('blog controller - get post', req.params.slug);
                res.json(result);
            })
            .catch(function(err) {
                logger.error('blog controller - can\'t get blog post', req.params.slug, err);
                res.send(err);
            });
    });
    
    router.put('/post', auth.required, function(req, res) {
        blogProvider.savePost(req.body)
            .then(function(result) {
                logger.debug('blog controller - save post', req.body.slug);
                res.json(result);
            })
            .catch(function(err) {
                logger.error('blog controller - can\'t save blog posts', req.body.slug, err);
                res.send(err);
            });
    });
    
    router.delete('/post/:id', auth.required, function(req, res) {
        blogProvider.deletePost(req.params.id)
            .then(function() {
                logger.debug('blog controller - delete post', req.params.id);
                res.send(200);
            })
            .catch(function(err) {
                logger.error('blog controller - can\'t delete blog post', req.params.id, err);
                res.send(err);
            });
    });
};