angular.module('ildotcomApp', [
    'ui.bootstrap',
    'ui.router',
    'ngAnimate',
    'ngSanitize',
    'infinite-scroll',
    'appDirectives',
    'appRoutes',
    'mainController',
    'authController',
    'workController',
    'blogController',
    'adventureController',
    'travelController',
    'climbController',
    'bucketListController',
    'gameController',
    'wowController',
    'diabloController',
    'starcraftController',
    'authService',
    'workService',
    'blogService',
    'adventureService',
    'gameService'
]).config(['$httpProvider', function($httpProvider) {
    var token = window.localStorage.getItem('token');
    if (token) {
        $httpProvider.defaults.headers.common = { 'x-access-token': token }
    }
}]);