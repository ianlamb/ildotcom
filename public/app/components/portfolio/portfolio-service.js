angular.module('app.portfolio')
    .factory('Projects', ['$http', function($http) {
        'use strict';

        return {
            get: function() {
                return $http.get('/api/projects');
            },
            put: function(data) {
                return $http.put('/api/project', data);
            },
            delete: function(data) {
                return $http.delete('/api/project/' + data._id);
            }
        };

    }]);
