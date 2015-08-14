angular.module('app.games.diablo')
    .factory('DiabloProfile', ['$http', function($http) {
        'use strict';

        return {
            get: function() {
                return $http.get('/api/d3')
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    console.error(err);
                });
            }
        };
    }]);