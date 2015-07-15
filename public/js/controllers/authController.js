angular.module('authController', []).controller('AuthController',
    function($scope, $rootScope, $location, $state, $timeout, $http, Auth) {
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
                    $http.defaults.headers.common['x-access-token'] = data.token;
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
    
    $scope.spoof = function() {
        $rootScope.authorized = true;
        $scope.message = { type: 'success', body: 'You are now spoofing my account. You can see how my management tools work but can\'t make any changes.' };
    };
    
    $scope.logout = function() {
        delete window.localStorage.token;
        $http.defaults.headers.common['x-access-token'] = '';
        $rootScope.authorized = false;
        $location.path('/login').replace();
        $scope.message = { type: 'info', body: 'Session destroyed!' };
    };
    
    $scope.$on('$viewContentLoaded', function() {
        if ($state.current.name === 'logout') {
            $scope.logout();
        }
        if ($state.current.name === 'login') {
            if ($rootScope.authorized) {
                $location.path('/home').replace();
            }
        }
    });
});