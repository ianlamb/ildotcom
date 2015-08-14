angular.module('app.adventure.climbs')
    .factory('Climbs', ['$http', function($http) {
        'use strict';

        return {
            get: function() {
                return $http.get('/api/climbs');
            },
            put: function(data) {
                return $http.put('/api/climb', data);
            }
        };

    }]);
