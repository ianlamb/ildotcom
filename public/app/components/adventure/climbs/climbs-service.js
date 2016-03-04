angular.module('app.adventure.climbs')
    .factory('Climbs', ['$http', function($http) {
        'use strict';

        var climbDataCache;

        return {
            get: function() {
                climbDataCache = climbDataCache || $http.get('/api/climbs')
                return climbDataCache;
            },
            put: function(data) {
                return $http.put('/api/climb', data);
            }
        };

    }]);
