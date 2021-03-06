angular.module('app.home', [])
    .controller('HomeController',
        function($scope, Utilities, Posts) {
        'use strict';
    
        // get recent posts to display on home page
        Posts.getRecent()
            .then(function(data) {
                $scope.posts = data;
            })
            .catch(function(err) {
                console.error(err);
            });
    
        $scope.scrollDown = function() {
            Utilities.scrollTo(document.body, document.getElementById('main').offsetTop, 800);
        };
        
        // some static data for home page
        $scope.contact = {
            "email": "ianlamb32@gmail.com",
            "phone": "+1 949.299.9654",
            "location": {
                "name": "Irvine, California",
                "latitude": 33.6869211,
                "longitude": -117.9143369
            }
        };

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
