angular.module('app.blog', [
        'app.blog.roll',
        'app.blog.post'
    ])
    .controller('BlogController', function($scope, $rootScope, $state) {
        'use strict';
        
        $scope.state = $state.current;
        $rootScope.$on('$stateChangeStart', function(e, toState) {
            $scope.state = toState;
        });
    
    });
