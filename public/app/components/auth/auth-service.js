angular.module('app.auth')
    .factory('Auth', ['$http', function($http) {
        'use strict';

        return {
            post: function(password) {
                return $http.post('/api/auth', { password: password });
            }
        };

    }]);
