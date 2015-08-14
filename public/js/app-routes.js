angular.module('app.routes', ['ui.router'])
    .config(function($urlRouterProvider, $stateProvider, $locationProvider) {
    'use strict';

    $urlRouterProvider
        .when('/adventure', '/adventure/travel')
        .when('/gaming', '/gaming/wow')
        .otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'components/home/home-view.html',
            controller: 'HomeController'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'components/about/about-view.html',
            controller: 'AboutController'
        })

        .state('resume', {
            url: '/resume',
            templateUrl: 'components/resume/resume-view.html',
            controller: 'ResumeController'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'components/auth/login-view.html',
            controller: 'AuthController'
        })

        .state('logout', {
            url: '/logout',
            templateUrl: 'components/auth/logout-view.html',
            controller: 'AuthController'
        })

        .state('work', {
            url: '/work',
            templateUrl: 'views/work.html',
            controller: 'WorkController'
        })
            .state('work.project', {
                url: '/work/:slug',
                templateUrl: 'views/project.html',
                controller: 'WorkController'
            })

        .state('blog', {
            url: '/blog?tags',
            templateUrl: 'components/blog/blog-view.html',
            controller: 'BlogController'
        })
            .state('blog.roll', {
                url: '/roll',
                templateUrl: 'components/blog/roll-view.html',
                controller: 'BlogController'
            })
            .state('blog.post', {
                url: '/post/:slug',
                templateUrl: 'components/blog/post-view.html',
                controller: 'PostController'
            })

        .state('adventure', {
            url: '/adventure',
            templateUrl: 'components/adventure/adventure-view.html',
            controller: 'AdventureController'
        })
            .state('adventure.travel', {
                url: '/travel',
                templateUrl: 'components/adventure/travel/travel-view.html',
                controller: 'TravelController'
            })
            .state('adventure.climb', {
                url: '/climb',
                templateUrl: 'components/adventure/climbs/climbs-view.html',
                controller: 'ClimbsController'
            })
            .state('adventure.bucket-list', {
                url: '/bucket-list',
                templateUrl: 'components/adventure/bucket-list/bucket-list-view.html',
                controller: 'BucketListController'
            })
            .state('adventure.places', {
                url: '/places',
                templateUrl: 'components/adventure/places/places-view.html',
                controller: 'PlacesController'
            })

        .state('gaming', {
            url: '/gaming',
            templateUrl: 'components/games/games-view.html',
            controller: 'GamesController'
        })
            .state('gaming.wow', {
                url: '/wow',
                templateUrl: 'components/games/warcraft/warcraft-view.html',
                controller: 'WarcraftController'
            })
            .state('gaming.diablo', {
                url: '/diablo',
                templateUrl: 'components/games/diablo/diablo-view.html',
                controller: 'DiabloController'
            })
            .state('gaming.starcraft', {
                url: '/starcraft',
                templateUrl: 'components/games/starcraft/starcraft-view.html',
                controller: 'StarcraftController'
            })
        ;

    $locationProvider.html5Mode(true);

});
