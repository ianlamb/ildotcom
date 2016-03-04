angular.module('app.adventure.travel')
    .factory('Trips', ['$http', function($http) {
        'use strict';

        var tripsDataCache;

        return {
            get: function() {
                tripsDataCache = tripsDataCache || $http.get('/api/trips');
                return tripsDataCache;
            },
            put: function(data) {
                return $http.put('/api/trip', data);
            },
            delete: function(id) {
                return $http.delete('/api/trip/' + id);
            }
        };

    }]);
