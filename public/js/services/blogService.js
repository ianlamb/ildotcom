angular.module('blogService', [])
    .factory('Posts', ['$http', function($http) {
        'use strict';

        return {
            get: function() {
                return $http.get('/api/posts');
            },
            getRecent: function() {
                return $http.get('/api/posts', {
                    params: {
                        limit: 3
                    }
                });
            }
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
