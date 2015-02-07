angular.module('appRoutes', ['ui.router']).config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $urlRouterProvider
        .when('/adventure', '/adventure/travel')
        .when('/gaming', '/gaming/wow')
        .otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller: 'MainController'
        })

        .state('adventure', {
            url: '/adventure',
            templateUrl: 'views/adventure.html',
            controller: 'AdventureController'
        })
            .state('adventure.travel', {
                url: '/travel',
                templateUrl: 'views/adventure/travel.html',
                controller: 'TravelController'
            })
            .state('adventure.climb', {
                url: '/climb',
                templateUrl: 'views/adventure/climb.html',
                controller: 'ClimbController'
            })

        .state('gaming', {
            url: '/gaming',
            templateUrl: 'views/gaming.html',
            controller: 'GamingController'
        })
            .state('gaming.wow', {
                url: '/wow',
                templateUrl: 'views/gaming/wow.html',
                controller: 'WowController'
            })
            .state('gaming.diablo', {
                url: '/diablo',
                templateUrl: 'views/gaming/diablo.html',
                controller: 'DiabloController'
            })
            .state('gaming.starcraft', {
                url: '/starcraft',
                templateUrl: 'views/gaming/starcraft.html',
                controller: 'StarcraftController'
            })

    $locationProvider.html5Mode(true);

});
