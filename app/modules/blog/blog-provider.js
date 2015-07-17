var mongoose        = require('mongoose');
var request         = require('request');
var Promise         = require('promise');
var Post            = require('./post-model');

module.exports = function() {
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
        searchCriteria = searchCriteria || {};
        return new Promise(function(resolve, reject) {
            Post.findOne(searchCriteria, {}, { sort: { 'created_at': -1 }})
                .exec(function(err, data) {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
        });
    };
    
    this.upsertPost = function(post) {
        return new Promise(function(resolve, reject) {
            Post.findOne({ _id: post._id }, function(err, post) {
                if (err) {
                    reject(err);
                }
                if (!post) {
                    console.log('new post');
                    post = new Post(post);
                } else {
                    console.log('update post');
                    for (var prop in post) {
                        if (post.hasOwnProperty(prop) && post[prop]) {
                            post[prop] = post[prop];
                        }
                    }
                }
                console.log(post.title);
                post.save(function(err, newPost) {
                    if (err) {
                        reject(err);
                    }
                    resolve(newPost);
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