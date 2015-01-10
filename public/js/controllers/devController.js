angular.module('devController', []).controller('DeveloperController', function($scope, $routeParams) {

    $scope.params = $routeParams;

    var tabs = [
        'projects',
        'resume'
    ];

    if($.inArray($scope.params.tab, tabs) === -1) {
        $scope.tab = tabs[0];
    } else {
        $scope.tab = $scope.params.tab;
    }

});
