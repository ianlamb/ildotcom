angular.module('app.games.starcraft')
    .factory('StarcraftProfile', ['$http', function($http) {
        'use strict';

        return {
            get: function() {
                return $http.get('/api/sc2')
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    console.error(err);
                });
            }
        };
    }]);