angular.module('app')
    .controller('mainController',
        function($scope, $rootScope, $window, $location, $state, $http, $timeout) {
        'use strict';
    
        $rootScope.moment = moment;
        
        $scope.logout = function() {
            $location.path('/logout').replace();
        };
    
        // check for auth token
        var token = window.localStorage.getItem('token');
        if (token) {
            var decoded = jwt_decode(token);
            var now = new Date().getTime();
            var diff = decoded.exp - now;
            if (diff < 0) {
                $scope.logout();
            } else {
                $http.defaults.headers.common['x-access-token'] = token;
                $timeout($scope.logout, diff);
                $rootScope.authorized = true;
            }
        }
    
        // direct to default sub modules
        $rootScope.$on('$stateChangeStart', function(e, toState) {
            if (toState.name === 'blog') { 
                e.preventDefault();
                $state.go('blog.roll');
            }
            if (toState.name === 'adventure') { 
                e.preventDefault();
                $state.go('adventure.travel');
            }
            if (toState.name === 'gaming') { 
                e.preventDefault();
                $state.go('gaming.wow');
            }
        });
    
        // scroll to the top of the window to make page changes feel natural
        $rootScope.$on('$stateChangeSuccess', function() {
            $window.scrollTo(0,0);
        });
    
        $scope.$on('$viewContentLoaded', function() {
            $window.ga('send', 'pageview', { page: $location.url() });
            $(".navbar-collapse.collapse.in").collapse('hide');
        });
    
        $scope.trackClickEvent = function(label) {
            ga('send', 'event', 'button', 'click', label);
        };
    
    });
