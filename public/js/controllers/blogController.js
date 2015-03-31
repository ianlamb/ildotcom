angular.module('blogController', []).controller('BlogController', function($scope, $filter, $stateParams, Posts) {
    'use strict';

    Posts.get()
        .success(function(data) {
            $scope.posts = [];
            var posts = data;
            var postCounter;
            for (postCounter = 0; postCounter < 5 && posts[postCounter]; postCounter++) {
                $scope.posts.push(posts[postCounter]);
            }
            $scope.loadMore = function() {
                if(posts[postCounter+1]) {
                    $scope.posts.push(posts[postCounter++]);
                }
            };
        })
        .error(function(err) {
            console.error(err);
        });
    
    $scope.newPost = { title: '', body: '', tags: '' };
    $scope.editedPost = null;
    
    $scope.addPost = function () {
        var newPost = {
            title: $scope.newPost.title.trim(),
            slug: $scope.newPost.title.trim().toLowerCase().split('\'').join('').split(' ').join('-'),
            body: $scope.newPost.body.replace(/\r\n/g, '\n').split('\n').join('<br>').trim(),
            tags: $scope.newPost.tags.split(' '),
            created_at: new Date()
        };

        if (!newPost.title) {
            return;
        }

        $scope.saving = true;
        Posts.put(newPost)
            .then(function success(data) {
                $scope.newPost = { title: '', body: '', tags: '' };
                $scope.posts.unshift(newPost);
            })
            .finally(function () {
                $scope.saving = false;
            });
    };

    $scope.editPost = function (post) {
        $scope.editedPost = post;
    };

    $scope.saveEdits = function (post, event) {
        // Blur events are automatically triggered after the form submit event.
        // This does some unfortunate logic handling to prevent saving twice.
        if (event === 'blur' && $scope.saveEvent === 'submit') {
            $scope.saveEvent = null;
            return;
        }

        $scope.saveEvent = event;

        post.title = post.title.trim();

        if (post.title === $scope.originalPost.title) {
            $scope.editedPost = null;
            return;
        }

        Posts[post.title ? 'put' : 'delete'](post)
            .then(function success() {}, function error() {
                post.title = $scope.originalPost.title;
            })
            .finally(function () {
                $scope.editedPost = null;
            });
    };

    $scope.removePost = function (post) {
        Posts.delete(post)
            .success(function() {
                for (var i = 0; i < $scope.posts.length; i++) {
                    if ($scope.posts[i]._id == post._id) {
                        $scope.posts.splice(i, 1);
                    }
                }
            });
    };

    $scope.savePost = function (post) {
        Posts.put(post);
    };
    
    $scope.insertTab = function(e) {
        $scope.newPost.body += '    ';
    }

});
