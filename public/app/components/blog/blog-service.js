angular.module('app.blog')
    .factory('Posts', ['$http', function($http) {
        'use strict';

        var RECENT_POST_COUNT = 3;

        var postsDataCache;

        function getPosts() {
            postsDataCache = postsDataCache || $http.get('/api/posts');
            return postsDataCache;
        }

        function getRecentPosts() {
            return getPosts().then(function(posts) {
                return posts.data.slice(0, RECENT_POST_COUNT);
            });
        }

        return {
            get: getPosts,
            getRecent: getRecentPosts
        };

    }])

    .factory('Post', ['$http', function($http) {
        'use strict';

        return {
            get: function(slug) {
                if (slug) {
                    return $http.get('/api/post/' + slug);
                }
                return $http.get('/api/post');
            },
            put: function(data) {
                return $http.put('/api/post', data);
            },
            delete: function(data) {
                return $http.delete('/api/post/' + data._id);
            }
        };

    }]);
