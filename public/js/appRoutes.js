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

        // developer section
        .when('/developer', {
            templateUrl: 'views/developer.html',
            controller: 'DeveloperController'
        })
        .when('/developer/:tab', {
            templateUrl: 'views/developer.html',
            controller: 'DeveloperController'
        })

        // adventure section
        .when('/adventure', {
            templateUrl: 'views/adventure.html',
            controller: 'AdventureController'
        })
        .when('/adventure/:tab', {
            templateUrl: 'views/adventure.html',
            controller: 'AdventureController'
        })
        .when('/adventure/:tab/:action', {
            templateUrl: 'views/adventure.html',
            controller: 'AdventureController'
        })

        // gaming section
        .when('/gaming', {
            templateUrl: 'views/gaming.html',
            controller: 'GamingController'
        })
        .when('/gaming/:tab', {
            templateUrl: 'views/gaming.html',
            controller: 'GamingController'
        })

        // redirect to 404
        .otherwise({
            redirectTo: '/error/404'
        });

    $locationProvider.html5Mode(true);

}]);
