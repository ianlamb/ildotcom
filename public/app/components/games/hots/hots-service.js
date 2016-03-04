angular.module('app.games.hots')
    .factory('HotsProfile', ['$http', function($http) {
        'use strict';

        var hotsDataCache;

        return {
            get: function() {
                hotsDataCache = hotsDataCache || $http.get('/api/hots')
                    .success(function(data) {
                        return data;
                    })
                    .error(function(err) {
                        console.error(err);
                    });

                return hotsDataCache;
            }
        };
    }]);