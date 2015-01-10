angular.module('gameController', []).controller('GamingController', function($scope, $routeParams) {

    $scope.params = $routeParams;

    var tabs = [
        'wow',
        'diablo',
        'starcraft',
        'steam'
    ];

    if($.inArray($scope.params.tab, tabs) === -1) {
        $scope.tab = tabs[0];
    } else {
        $scope.tab = $scope.params.tab;
    }

});
