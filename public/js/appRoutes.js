angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // about page
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'MainController'
        })

        // errors
        .when('/error/404', {
            templateUrl: 'views/error/404.html',
            controller: 'MainController'
        })
        .when('/error/500', {
            templateUrl: 'views/error/500.html',
            controller: 'MainController'
        })

        // adventure section
        .when('/adventure/:tab?/:action?', {
            templateUrl: 'views/adventure.html',
            controller: 'AdventureController'
        })

        // gaming section
        .when('/gaming/:tab?', {
            templateUrl: 'views/gaming.html',
            controller: 'GamingController'
        })

        // redirect to 404
        .otherwise({
            redirectTo: '/error/404'
        });

    $locationProvider.html5Mode(true);

}]);
