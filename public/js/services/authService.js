angular.module('authService', [])
    .factory('Auth', ['$http', function($http, $location) {

        return {
            post: function(password) {
                return $http.post('/api/auth', { password: password })
                        .success(function(data, status, headers, config) {
                            window.localStorage.setItem('token', data.token);
                            $.ajaxSetup({
                                headers: {
                                    'x-access-token': data.token
                                }
                            });
                            $location.path('/home').replace();
                        })
                        .error(function(data, status, headers, config) {
                            alert('Unauthorized');
                        });
            }
        };

    }]);
