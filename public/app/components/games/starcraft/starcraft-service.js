angular.module('app.games.starcraft')
    .factory('StarcraftProfile', ['$http', function($http) {
        'use strict';

        var sc2DataCache;

        return {
            get: function() {
                sc2DataCache = sc2DataCache || $http.get('/api/sc2')
                    .success(function(data) {
                        return data;
                    })
                    .error(function(err) {
                        console.error(err);
                    });

                return sc2DataCache;
            }
        };
    }]);