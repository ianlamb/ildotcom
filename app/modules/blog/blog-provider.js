/* global Promise */

var Post            = require('./post-model');

module.exports = function() {
    'use strict';
    
    this.getPosts = function(limit) {
        return new Promise(function(resolve, reject) {
            limit = limit || 50;
            Post.find({}, {}, { sort: { 'created_at': -1 }})
                .limit(limit)
                .exec(function(err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
        });
    };
    
    this.getPost = function(searchCriteria) {
        return new Promise(function(resolve, reject) {
            searchCriteria = searchCriteria || {};
            Post.findOne(searchCriteria, {}, { sort: { 'created_at': -1 }})
                .exec(function(err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
        });
    };
    
    this.savePost = function(data) {
        return new Promise(function(resolve, reject) {
            Post.findOne({ _id: data._id }, function(err, post) {
                if (err) {
                    reject(err);
                }
                if (!post || !data._id) {
                    post = new Post(data);
                } else {
                    for (var prop in post) {
                        if (data.hasOwnProperty(prop) && data[prop]) {
                            post[prop] = data[prop];
                        }
                    }
                }
                post.save(function(err, res) {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                });
            });
        });
    };
    
    this.deletePost = function(id) {
        return new Promise(function(resolve, reject) {
            Post.remove({ _id: id })
                .exec(function(err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });
        });
    };
};