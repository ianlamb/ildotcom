angular.module('blogService', [])
    .factory('Posts', ['$http', function($http) {

        return {
            get: function() {
                return $http.get('/api/posts');
            },
            getLatest: function() {
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
