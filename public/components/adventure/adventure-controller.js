angular.module('app.adventure', [
        'app.adventure.bucket-list',
        'app.adventure.climbs',
        'app.adventure.places',
        'app.adventure.travel'
    ])
    .controller('AdventureController', function($scope, $rootScope, $state) {
        'use strict';
    
        $scope.state = $state.current;
        $rootScope.$on('$stateChangeStart', function(e, toState) {
            $scope.state = toState;
        });
    
    });
