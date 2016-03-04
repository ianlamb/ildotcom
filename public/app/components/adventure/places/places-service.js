angular.module('app.adventure.places')
    .factory('Places', ['$http', function($http) {
        'use strict';

        var placesDataCache, citiesDataCache;

        return {
            get: function() {
                placesDataCache = placesDataCache || $http.get('/api/places');
                return placesDataCache;
            },
            getCities: function() {
                citiesDataCache = citiesDataCache || $http.get('/api/cities');
                return citiesDataCache;
            },
            put: function(data) {
                return $http.put('/api/place', data);
            },
            delete: function(data) {
                return $http.delete('/api/place/' + data._id);
            }
        };

    }]);
