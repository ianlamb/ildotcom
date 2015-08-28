angular.module('app.blog.roll', [])
    .controller('BlogRollController',
        function($scope, $rootScope, $state, $location, Posts, Utilities) {
        'use strict';
        
        var MAX_POST_COUNT = 5;
    
        $scope.markdown = markdown;
        $scope.search = $location.search();
        $rootScope.$on('$locationChangeSuccess', function() {
            $scope.search = $location.search();
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
