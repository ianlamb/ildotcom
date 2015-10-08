angular.module('app.games.hots')
    .factory('HotsProfile', ['$http', function($http) {
        'use strict';

        return {
            get: function() {
                return $http.get('/api/hots')
                .success(function(data) {
                    return data;
                })
                .error(function(err) {
                    console.error(err);
                });
            }
        };
    }]);