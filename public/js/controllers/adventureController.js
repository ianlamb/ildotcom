angular.module('adventureController', ['ui.router']).controller('AdventureController', function($scope, $rootScope, $state) {

    $scope.state = $state.current;
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        $scope.state = toState;
    });

});
