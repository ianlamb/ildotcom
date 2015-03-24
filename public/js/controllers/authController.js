angular.module('authController', []).controller('AuthController', function($scope, $rootScope, $location, $state, $timeout, Auth) {
    $scope.login = function() {
        Auth.post($scope.password)
            .success(function(data, status, headers, config) {
                window.localStorage.setItem('token', data.token);
                $.ajaxSetup({
                    headers: {
                        'x-access-token': data.token
                    }
                });
                $rootScope.authorized = true;
                $timeout(function() {
                    $location.path('/home').replace();
                }, 2000);
                $scope.message = { type: 'success', body: 'Login success!' };
            })
            .error(function(data, status, headers, config) {
                $scope.message = { type: 'danger', body: 'Unauthorized password' };
            });
    };
    
    $scope.logout = function() {
        delete window.localStorage.token;
        $rootScope.authorized = false;
        $scope.message = { type: 'info', body: 'Session destroyed!' };
    };
    
    $scope.$on('$viewContentLoaded', function() {
        if ($state.current.name === 'logout') {
            if (window.localStorage.getItem('token')) {
                $scope.logout();
            }
            $location.path('/login').replace();
        }
        if ($state.current.name === 'login') {
            if (window.localStorage.getItem('token')) {
                $location.path('/home').replace();
            }
        }
    });
});