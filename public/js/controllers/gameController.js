angular.module('gameController', ['ui.router'])
    .controller('GamingController', function($scope, $rootScope, $state) {
    'use strict';

    $scope.state = $state.current;
    $rootScope.$on('$stateChangeStart', function(e, toState) {
        $scope.state = toState;
    });

});
