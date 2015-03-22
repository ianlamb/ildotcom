angular.module('mainController', []).controller('MainController', function($scope, $rootScope, $window, $location, $state) {
    
    var token = window.localStorage.getItem('token');
    if (token) {
        $rootScope.authorized = true;
    }

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        if (toState.name === 'adventure') { 
            e.preventDefault();
            $state.go('adventure.travel');
        }
        if (toState.name === 'gaming') { 
            e.preventDefault();
            $state.go('gaming.wow');
        }
        $window.scrollTo(0,0);
    });

    $rootScope.moment = moment;

    $scope.$on('$viewContentLoaded', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
        $(".navbar-collapse.collapse.in").collapse('hide');
    });
    
    $scope.email = 'ianlamb32@gmail.com';
    $scope.phone = '+1 (519) 902 6533';
    $scope.location = { name: 'London, ON', latLng: [42.9837, -81.2497] };
    $scope.projects = [
        {
            name: 'GoodLife Fitness Sales',
            url: 'http://www.goodlifefitness.com/training-programs/team-training/camps/ontario/london',
            repo: '',
            image: 'glf-sales-opt.png',
            desc: 'Sales engine for selling GoodLife team training contracts online'
        },
        {
            name: 'Store Finder',
            url: 'http://apps.ianlamb.com/storefinder/',
            repo: 'https://github.com/ianlamb/storefinder',
            image: 'store-finder-opt.png',
            desc: 'Component for selecting stores from a large network'
        },
        {
            name: 'Tempus Notes',
            url: 'http://notes.ianlamb.com/',
            repo: 'https://github.com/ianlamb/notes',
            image: 'tempus-notes-opt.png',
            desc: 'A very simple note-taker, great for remembering what you did for daily scrum'
        },
        {
            name: 'Dark Souls Challenge Runs',
            url: 'http://darksouls.ianlamb.com/challenges',
            repo: 'https://github.com/ianlamb/darksouls-challenges',
            image: 'dscrgen-opt.png',
            desc: 'A fun little randomizer for Dark Souls challenge runs'
        },
        {
            name: 'Z-Code',
            url: 'http://zcode.ianlamb.com/',
            repo: 'https://github.com/ianlamb/zcode',
            image: 'zcode-opt.png',
            desc: 'HTML5 game that my buddy and I made in college'
        },
        {
            name: 'Creekside Landscaping',
            url: 'http://www.creeksidelandscaping.ca/',
            repo: '',
            image: 'creekside-landscaping-opt.png',
            desc: 'WordPress redesign for my neighbour\'s landscaping business'
        }
    ];

});