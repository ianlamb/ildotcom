angular.module('adventureController', []).controller('AdventureController', function($scope, $routeParams) {

    $scope.params = $routeParams;

    var tabs = [
        'travel',
        'climb',
        'activity'
    ];

    if($.inArray($scope.params.tab, tabs) === -1) {
        $scope.tab = tabs[0];
    } else {
        $scope.tab = $scope.params.tab;
    }

});
