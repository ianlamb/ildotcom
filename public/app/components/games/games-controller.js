angular.module('app.games', [
        'app.games.diablo',
        'app.games.starcraft',
        'app.games.warcraft',
        'app.games.hots'
    ])
    .controller('GamesController', function($scope, $rootScope, $state) {
        'use strict';
    
        $scope.state = $state.current;
        $rootScope.$on('$stateChangeStart', function(e, toState) {
            $scope.state = toState;
        });
    
    });
