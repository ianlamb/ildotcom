angular.module('app.adventure.travel')
    .factory('Trips', ['$http', function($http) {
        'use strict';

        return {
            get: function() {
                return $http.get('/api/trips');
            }
        };

    }]);
