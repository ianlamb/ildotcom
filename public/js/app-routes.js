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
            templateUrl: 'views/blog.html',
            controller: 'BlogController'
        })
            .state('blog.roll', {
                url: '/roll',
                templateUrl: 'views/blog/roll.html',
                controller: 'BlogController'
            })
            .state('blog.post', {
                url: '/post/:slug',
                templateUrl: 'views/blog/post.html',
                controller: 'PostController'
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
            .state('adventure.bucket-list', {
                url: '/bucket-list',
                templateUrl: 'views/adventure/bucket-list.html',
                controller: 'BucketListController'
            })
            .state('adventure.places', {
                url: '/places',
                templateUrl: 'views/adventure/places.html',
                controller: 'PlacesController'
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
        ;

    $locationProvider.html5Mode(true);

});
