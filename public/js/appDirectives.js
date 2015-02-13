angular.module('appDirectives', [])
    .directive('navigation', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/templates/navigation.html',
            controller: function($scope, $location) {
                $scope.navLinks = [
                    { slug: 'home', text: 'Home', sortRank: 0 },
                    { slug: 'about', text: 'About', sortRank: 1 },
                    { slug: 'adventure', text: 'Adventure', sortRank: 2 },
                    { slug: 'gaming', text: 'Gaming', sortRank: 3 }
                ];

                $scope.isActive = function(slug) {
                    var baseNav;
                    var urlParts = $location.path().split('/');
                    if (urlParts.length > 1 && urlParts[1] !== '') {
                        baseNav = urlParts[1];
                    } else {
                        baseNav = 'home';
                    }
                    if(baseNav === slug) {
                        return 'active';
                    }
                    return '';
                }
            }
        };
    })

    .directive('footer', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/templates/footer.html',
            controller: function($scope) {
                $scope.year = moment().year();
            }
        };
    })

    .directive('login', function() {
        return {
            restrict: 'A',
            controller: function($scope) {
                $(document).on('keypress', '#login', function(e) {
                    if ( e.which == 13 ) {
                        e.preventDefault();
                        alert('yo');
                    }
                });
            }
        };
    })

    .directive('projects', function() {
        return {
            restrict: 'E',
            controller: function($scope) {
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
            }
        };
    })

    .directive('contact', function() {
        return {
            restrict: 'E',
            controller: function($scope, $interval) {
                $scope.email = 'ianlamb32@gmail.com';
                $scope.phone = '+1 (519) 902 6533';
                $scope.location = 'London, Canada';


                var placesData = [
                    { latLng: [42.9837, -81.2497], name: 'London, ON' }
                ];

                $('#contactMap').vectorMap({
                    map: 'world_mill_en',
                    backgroundColor: 'transparent',
                    zoomOnScroll: false,
                    regionStyle: {
                        initial: {
                            fill: '#5C6B68',
                            'fill-opacity': 1
                        },
                        hover: {
                            fill: '#5C6B68',
                            'fill-opacity': 1
                        }
                    },
                    markerStyle: {
                        initial: {
                            fill: 'orangered',
                            'fill-opacity': 1,
                            'stroke-fill': 'orangered',
                            'stroke-width': 10,
                            'stroke-opacity': 0.5,
                            r: 10
                        },
                        hover: {
                            'stroke-fill': '#00C80A',
                            'stroke-width': 10,
                            'stroke-opacity': 0.5,
                        }
                    },
                    markers: placesData
                });

                // var homeCoords = $('#contactMap .jvectormap-marker').position();
                // var homeIcon = $('<div class="home-icon"><i class="fa fa-home"></i></div>')
                //     .css('top', homeCoords.top)
                //     .css('left', homeCoords.left);
                // $('#contactMap').append(homeIcon);

                var beacon = $interval(function() {
                    $('#contactMap .jvectormap-marker')
                        .animate({
                            'stroke-width': '30px'
                        }, 700, function() {
                            $(this).animate({
                                'stroke-width': '10px'
                            }, 700)
                        })
                }, 1500);
            }
        };
    })

    .directive('quotation', function() {
        return {
            restrict: 'E',
            controller: function($scope) {
                var quotes = [
                    {
                        text: 'I\'ve got a great ambition to die of exhaustion rather than boredom',
                        person: 'Thomas Carlyle', link: 'http://en.wikipedia.org/wiki/Thomas_Carlyle'
                    },
                    {
                        text: 'The mind is furnished with ideas by experience alone',
                        person: 'John Locke', link: 'http://en.wikipedia.org/wiki/John_Locke'
                    },
                    {
                        text: 'The unexamined life is not worth living',
                        person: 'Socrates', link: 'http://en.wikipedia.org/wiki/Socrates'
                    },
                    {
                        text: 'One cannot step twice in the same river',
                        person: 'Heraclitus', link: 'http://en.wikipedia.org/wiki/Heraclitus'
                    },
                ];

                function randomQuote() {
                    if(quotes.length === 0) {
                        return '';
                    }
                    var index = parseInt(Math.random() * quotes.length);
                    return quotes[index];
                }

                $scope.quote = randomQuote();
            }
        }
    })

    .directive('vehicleSection', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/adventure/vehicles.html',
            controller: function($scope) {
                $http.get('/api/vehicles')
                    .success(function(autos) {
                        var stats = {
                            distanceDriven: 0,
                            carsOwned: 0,
                            motorcyclesOwned: 0
                        };

                        autos.forEach(function(auto) {
                            auto.distanceDriven = auto.odometer.latest - auto.odometer.atPurchase;
                            stats.distanceDriven += auto.distanceDriven;
                            if(auto.type === 'motorcycle')
                                stats.motorcyclesOwned++;
                            if(auto.type === 'car')
                                stats.carsOwned++;
                            if(!auto.dateOfSale)
                                auto.dateOfSale = 'N/A';
                        });

                        commaSeparator = $.animateNumber.numberStepFactories.separator(',');
                        $('#distanceDriven').animateNumber({ number: stats.distanceDriven, numberStep: commaSeparator }, 1000);
                        $('#carsOwned').animateNumber({ number: stats.carsOwned }, 1000);
                        $('#motorcyclesOwned').animateNumber({ number: stats.motorcyclesOwned }, 1000);

                        $scope.autos = autos;
                        $scope.stats = stats;
                    })
                    .error(function(err) {
                        console.log('Error: ' + err);
                    });
            }
        }
    })

    .directive('continuousLoading', function() {
        return {
            restrict: 'A',
            controller: function($scope) {
                
            }
        }
    });