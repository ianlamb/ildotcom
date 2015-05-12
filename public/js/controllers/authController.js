angular.module('authController', []).controller('AuthController',
    function($scope, $rootScope, $location, $state, $timeout, Auth) {
    'use strict';
    
    $scope.login = function() {
        Auth.post($scope.password)
            .success(function(data) {
                window.localStorage.setItem('token', data.token);
                var decoded = jwt_decode(data.token);
                var now = new Date().getTime();
                var diff = decoded.exp - now;
                if (diff < 0) {
                    $scope.logout();
                } else {
                    $timeout($scope.logout, diff);
                    $rootScope.authorized = true;
                    $scope.message = { type: 'success', body: 'Login success!' };
                }
            })
            .error(function(data) {
                console.warn(data);
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