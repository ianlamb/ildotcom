angular.module('app.adventure.travel')
    .factory('Trips', ['$http', function($http) {
        'use strict';

        return {
            get: function() {
                return $http.get('/api/trips');
            },
            put: function(data) {
                return $http.put('/api/trip', data);
            },
            delete: function(id) {
                return $http.delete('/api/trip/' + id);
            }
        };

    }]);
