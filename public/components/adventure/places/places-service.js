angular.module('app.adventure.places')
    .factory('Places', ['$http', function($http) {
        'use strict';

        return {
            get: function() {
                return $http.get('/api/places');
            },
            getCities: function() {
                return $http.get('/api/cities');
            },
            put: function(data) {
                return $http.put('/api/place', data);
            },
            delete: function(data) {
                return $http.delete('/api/place/' + data._id);
            }
        };

    }]);
