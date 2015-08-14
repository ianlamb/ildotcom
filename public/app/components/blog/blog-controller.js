angular.module('app.blog', [])
    .controller('BlogController',
        function($scope, $rootScope, $filter, $state, $stateParams, $location, Posts, Post, Utilities) {
        'use strict';
        
        var MAX_POST_COUNT = 5;
    
        $scope.markdown = markdown;
        $scope.state = $state.current;
        $rootScope.$on('$stateChangeStart', function(e, toState/*, toParams, fromState, fromParams*/) {
            $scope.state = toState;
        });
    
        Posts.get()
            .success(function(data) {
                $scope.posts = [];
                $scope.usedTags = {};
                var posts = data;
                var postCounter;
                for (postCounter = 0; postCounter < MAX_POST_COUNT && posts[postCounter]; postCounter++) {
                    $scope.posts.push(posts[postCounter]);
                }
                $scope.loadMore = function() {
                    if(posts[postCounter+1]) {
                        $scope.posts.push(posts[postCounter++]);
                    }
                };
    
                posts.forEach(function(post) {
                    for (var i = 0; i < post.tags.length; i++) {
                        if($scope.usedTags.hasOwnProperty(post.tags[i])) {
                           $scope.usedTags[post.tags[i]]++;
                        } else {
                            $scope.usedTags[post.tags[i]] = 1;
                        }
                    }
                });
            })
            .error(function(err) {
                console.error(err);
            });
        
        $scope.search = $location.search();
        
        $scope.newPost = { title: '', body: '', tags: '' };
        $scope.editedPost = null;
        
        $scope.addPost = function () {
            var newPost = {
                title: $scope.newPost.title.trim(),
                slug: Utilities.slugify($scope.newPost.title),
                body: $scope.newPost.body.trim(),
                tags: $scope.newPost.tags.split(' '),
                created_at: new Date()
            };
    
            if (!newPost.title) {
                return;
            }
    
            $scope.saving = true;
            Post.put(newPost)
                .then(function success(data) {
                    console.log(data);
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
    
            Post[post.title ? 'put' : 'delete'](post)
                .then(function success() {}, function error() {
                    post.title = $scope.originalPost.title;
                })
                .finally(function () {
                    $scope.editedPost = null;
                });
        };
    
        $scope.removePost = function (post) {
            Post.delete(post)
                .success(function() {
                    for (var i = 0; i < $scope.posts.length; i++) {
                        if ($scope.posts[i]._id === post._id) {
                            $scope.posts.splice(i, 1);
                        }
                    }
                });
        };
    
        $scope.savePost = function (post) {
            Post.put(post);
        };
        
        $scope.shortPost = function (postBody) {
            var MAX_POST_LENGTH = 140;
            var parsed;
            if (postBody.length > MAX_POST_LENGTH) {
                parsed = Utilities.stripHtmlTags(markdown.toHTML(postBody)).substr(0, MAX_POST_LENGTH);
                while (parsed[parsed.length-1] !== ' ') {
                    if (parsed.length === 0) {
                        break;
                    }
                    parsed = parsed.substr(0, parsed.length-1);
                }
                parsed += "...";
            } else {
                parsed = postBody;
            }
            return parsed;
        };
    
    });