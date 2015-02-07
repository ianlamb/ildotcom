angular.module('gameController', ['ui.router']).controller('GamingController', function($scope, $rootScope, $state) {

    $scope.state = $state.current;
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        $scope.state = toState;
    });

});
