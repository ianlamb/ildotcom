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
            templateUrl: 'app/components/home/home-view.html',
            controller: 'HomeController'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'app/components/about/about-view.html',
            controller: 'AboutController'
        })

        .state('resume', {
            url: '/resume',
            templateUrl: 'app/components/resume/resume-view.html',
            controller: 'ResumeController'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'app/components/auth/login-view.html',
            controller: 'AuthController'
        })

        .state('logout', {
            url: '/logout',
            templateUrl: 'app/components/auth/logout-view.html',
            controller: 'AuthController'
        })

        .state('portfolio', {
            url: '/portfolio',
            templateUrl: 'app/components/portfolio/portfolio-view.html',
            controller: 'PortfolioController'
        })
            .state('portfolio.project', {
                url: '/portfolio/:slug',
                templateUrl: 'app/components/portfolio/projects-view.html'
            })

        .state('blog', {
            url: '/blog',
            templateUrl: 'app/components/blog/blog-view.html',
            controller: 'BlogController'
        })
            .state('blog.roll', {
                url: '/roll?tags',
                reloadOnSearch : false,
                templateUrl: 'app/components/blog/roll/roll-view.html',
                controller: 'BlogRollController'
            })
            .state('blog.post', {
                url: '/post/:slug',
                templateUrl: 'app/components/blog/post/post-view.html',
                controller: 'BlogPostController'
            })

        .state('adventure', {
            url: '/adventure',
            templateUrl: 'app/components/adventure/adventure-view.html',
            controller: 'AdventureController'
        })
            .state('adventure.travel', {
                url: '/travel',
                templateUrl: 'app/components/adventure/travel/travel-view.html',
                controller: 'TravelController'
            })
            .state('adventure.climb', {
                url: '/climb',
                templateUrl: 'app/components/adventure/climbs/climbs-view.html',
                controller: 'ClimbsController'
            })
            .state('adventure.bucket-list', {
                url: '/bucket-list',
                templateUrl: 'app/components/adventure/bucket-list/bucket-list-view.html',
                controller: 'BucketListController'
            })
            .state('adventure.places', {
                url: '/places',
                templateUrl: 'app/components/adventure/places/places-view.html',
                controller: 'PlacesController'
            })

        .state('gaming', {
            url: '/gaming',
            templateUrl: 'app/components/games/games-view.html',
            controller: 'GamesController'
        })
            .state('gaming.wow', {
                url: '/wow',
                templateUrl: 'app/components/games/warcraft/warcraft-view.html',
                controller: 'WarcraftController'
            })
            .state('gaming.diablo', {
                url: '/diablo',
                templateUrl: 'app/components/games/diablo/diablo-view.html',
                controller: 'DiabloController'
            })
            .state('gaming.starcraft', {
                url: '/starcraft',
                templateUrl: 'app/components/games/starcraft/starcraft-view.html',
                controller: 'StarcraftController'
            })
            .state('gaming.hots', {
                url: '/hots',
                templateUrl: 'app/components/games/hots/hots-view.html',
                controller: 'HotsController'
            })
        ;

    $locationProvider.html5Mode(true);

});
