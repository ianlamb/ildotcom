angular.module('app.games.diablo')
    .factory('DiabloProfile', ['$http', function($http) {
        'use strict';

        var d3DataCache;

        return {
            get: function() {
                d3DataCache = d3DataCache || $http.get('/api/d3')
                    .success(function(data) {
                        return data;
                    })
                    .error(function(err) {
                        console.error(err);
                    });

                return d3DataCache;
            }
        };
    }]);