angular.module('ildotcomApp', [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'infinite-scroll',
    'appDirectives',
    'appRoutes',
    'authService',
    'mainController',
    'adventureController',
    'travelController',
    'climbController',
    'bucketListController',
    'gameController',
    'wowController',
    'diabloController',
    'starcraftController',
    'adventureService',
    'gameService'
]).config(['$httpProvider', function($httpProvider) {
    var token = window.localStorage.getItem('token');
    if (token) {
        $httpProvider.defaults.headers.common = { 'x-access-token': token }
    }
}]);