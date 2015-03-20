angular.module('authService', [])
    .factory('Auth', ['$http', function($http) {

        return {
            post: function(password) {
                return $http.post('/api/auth', { password: password });
            }
        };

    }]);
