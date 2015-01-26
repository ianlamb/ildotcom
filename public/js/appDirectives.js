angular.module('appDirectives', [])
    .directive('navigation', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/templates/navigation.html',
            controller: function($scope, $location) {
                $scope.navLinks = [
                    { slug: 'home', text: 'Home', sortRank: 0 },
                    { slug: 'adventure', text: 'Adventure', sortRank: 2 },
                    { slug: 'gaming', text: 'Gaming', sortRank: 3 }
                ];

                $scope.isActive = function(slug) {
                    var baseNav;
                    var urlParts = $location.path().split('/');
                    if (urlParts.length > 1) {
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

    .directive('projects', function() {
        return {
            restrict: 'E',
            controller: function($scope) {
                $scope.projects = [
                    {
                        name: 'Tempus Notes',
                        url: 'http://notes.ianlamb.com/',
                        image: 'tempus-notes-opt.png',
                        desc: 'A very simple note-taker, great for remembering what you did for daily scrum'
                    },
                    {
                        name: 'Dark Souls Challenge Runs',
                        url: 'http://darksouls.ianlamb.com/challenges',
                        image: 'dscrgen-opt.png',
                        desc: 'A fun little randomizer for Dark Souls challenge runs'
                    },
                    {
                        name: 'Z-Code',
                        url: 'http://zcode.ianlamb.com/',
                        image: 'zcode-opt.png',
                        desc: 'HTML5 game that my buddy and I made in college'
                    },
                    {
                        name: 'Creekside Landscaping',
                        url: 'http://www.creeksidelandscaping.ca/',
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

    .directive('projectsSection', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/developer/projects.html',
            controller: function($scope) {

            }
        }
    })

    .directive('resumeSection', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/developer/resume.html',
            controller: function($scope) {

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

    .directive('travelSection', function(Trips) {
        return {
            restrict: 'E',
            templateUrl: 'views/adventure/travel.html',
            controller: function($scope) {
                Trips.get()
                    .success(function(data) {
                        $scope.trips = data;
                        $scope.countriesVisited = 0;
                        $scope.citiesVisited = 0;
                        var countryData = {};
                        var geoData = [];
                    
                        $scope.trips.forEach(function(trip) {
                            trip.places.forEach(function(place) {
                                var geoObject = {
                                    latLng: [place.lat, place.lng],
                                    name: place.city + ', ' + place.countryCode
                                };
                                geoData.push(geoObject);
                                if(!countryData[place.countryCode]) {
                                    countryData[place.countryCode] = 10;
                                    $scope.countriesVisited++;
                                }
                            });
                        });
                        $scope.citiesVisited = geoData.length;

                        $('#map').vectorMap({
                            map: 'world_mill_en',
                            backgroundColor: 'transparent',
                            zoomOnScroll: false,
                            regionStyle: {
                                initial: {
                                    fill: '#ccc',
                                    'fill-opacity': 0.7
                                },
                                hover: {
                                    'fill-opacity': 1
                                }
                            },
                            markerStyle: {
                                initial: {
                                    fill: '#DA45F7',
                                    'fill-opacity': 1,
                                    'stroke-fill': '#DA45F7',
                                    'stroke-width': 2,
                                    'stroke-opacity': 0.5,
                                    r: 3
                                },
                                hover: {
                                    'stroke-fill': '#DA45F7',
                                    'stroke-width': 6,
                                    'stroke-opacity': 0.5,
                                }
                            },
                            series: {
                                regions: [{
                                    values: countryData,
                                    scale: ['#009CF3']
                                }]
                            },
                            normalizeFunction: 'polynomial',
                            hoverOpacity: 1,
                            hoverColor: false,
                            markers: geoData
                        });
                    });
                
                $scope.formatStartEndDates = function(startDate, endDate) {
                    return moment(startDate).format("MMM Do YY") + ' - ' + moment(endDate).format("MMM Do YY");
                };  
            }
        };
    })

    .directive('climbSection', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/adventure/climb.html',
            controller: function($scope, $http) {
                var boulderGrades = ['V0','V1','V2','V3','V4','V5','V6','V7','V8','V9','V10','V11','V12','V13','V14','V15'];
                var climbGrades = ['5.7','5.8','5.9-','5.9','5.9+','5.10-','5.10','5.10+','5.11-','5.11','5.11+','5.12-','5.12','5.12+'];

                $scope.boulderGrades = boulderGrades;
                $scope.climbGrades = climbGrades;
                $scope.climbTypes = {
                    'Boulder': boulderGrades,
                    'Lead': climbGrades,
                    'Top Rope': climbGrades
                };

                $http.get('/api/climbs')
                    .success(function(data) {
                        var stats = {
                            daysClimbed: 0,
                            routesClimbed: 0,
                            bestBoulder: boulderGrades[0],
                            bestLead: climbGrades[0],
                            bestTopRope: climbGrades[0]
                        };
                        var climbSessions = data;
                        var chartData = {
                            labels: ["January", "February", "March", "April", "May", "June", "July"],
                            datasets: [
                                {
                                    label: "My First dataset",
                                    fillColor: "rgba(220,220,220,0.2)",
                                    strokeColor: "rgba(220,220,220,1)",
                                    pointColor: "rgba(220,220,220,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(220,220,220,1)",
                                    data: [65, 59, 80, 81, 56, 55, 40]
                                },
                                {
                                    label: "My Second dataset",
                                    fillColor: "rgba(151,187,205,0.2)",
                                    strokeColor: "rgba(151,187,205,1)",
                                    pointColor: "rgba(151,187,205,1)",
                                    pointStrokeColor: "#fff",
                                    pointHighlightFill: "#fff",
                                    pointHighlightStroke: "rgba(151,187,205,1)",
                                    data: [28, 48, 40, 19, 86, 27, 90]
                                }
                            ]
                        };

                        climbSessions.forEach(function(session) {
                            session.dateFriendly = moment(session.date).format('MMMM Do, YYYY');
                            session.dateFormatted = moment(session.date).format('YYYY-MM-DD');
                            session.dateStandard = moment(session.date.split('T')[0]).format('YYYY-MM-DD');
                            session.sendCount = 0;
                            var topSendsForComp = [];
                            session.climbs.forEach(function(c) {
                                c.mappedSends = [];
                                c.sends.forEach(function(s) {
                                    var res = $.grep(c.mappedSends, function(e){ return e.grade == s; });
                                    if(res.length == 0) {
                                        var gradeClass;
                                        switch(c.type) {
                                        case 'Boulder':
                                            if(c.purpose === 'comp') {
                                                gradeClass = 'points';
                                            } else {
                                                gradeClass = s;
                                                if(boulderGrades.indexOf(s) > boulderGrades.indexOf(stats.bestLead))
                                                    stats.bestBoulder = s;
                                            }
                                            break;
                                        case 'Lead':
                                            gradeClass = 'five' + s.replace('5.','').replace('+','').replace('-','');
                                            if(climbGrades.indexOf(s) > climbGrades.indexOf(stats.bestLead))
                                                stats.bestLead = s;
                                            break;
                                        case 'Top Rope':
                                            gradeClass = 'five' + s.replace('5.','').replace('+','').replace('-','');
                                            if(climbGrades.indexOf(s) > climbGrades.indexOf(stats.bestTopRope))
                                                stats.bestTopRope = s;
                                            break;
                                        }
                                        c.mappedSends.push({ grade: s, gradeClass: gradeClass, sends: [s] });
                                    } else {
                                        res[0].sends.push(s)
                                    }
                                });
                                if(c.purpose === 'comp') {
                                    topSendsForComp = [];
                                    c.mappedSends.forEach(function(s) {
                                        topSendsForComp.push({ grade: s.grade });
                                    });
                                    topSendsForComp = topSendsForComp.sort(function(a, b) {
                                        return parseInt(a.grade) < parseInt(b.grade);
                                    });
                                    topSendsForComp = topSendsForComp.slice(0, 6);
                                    session.totalPoints = 0;
                                    var i = 0;
                                    topSendsForComp.forEach(function(s) {
                                        session.totalPoints += parseInt(s.grade);
                                        s.grade = '#' + (++i) + ' - ' + s.grade;
                                    });
                                }
                                session.sendCount = c.sends.length;
                                stats.routesClimbed += session.sendCount;
                            });
                            if(topSendsForComp.length > 0) {
                                session.climbs.push({
                                    type: 'Top Sends',
                                    mappedSends: topSendsForComp
                                });
                            }
                            session.climbs.sort(function(a, b) { 
                                return a.type > b.type;
                            });
                        });
                        stats.daysClimbed = climbSessions.length;

                        $('#daysClimbed').animateNumber({ number: stats.daysClimbed }, 1000);
                        $('#routesClimbed').animateNumber({ number: stats.routesClimbed }, 1000);
                        $('#bestBoulder .prefix').html('V');
                        $('#bestBoulder .number').animateNumber({ number: stats.bestBoulder.replace('V','') }, 1000);
                        $('#bestLead .prefix').html('5.');
                        if(stats.bestLead.indexOf('-') > -1)
                            $('#bestLead .suffix').hide().html('-').delay(1100).fadeIn(500);
                        if(stats.bestLead.indexOf('+') > -1)
                            $('#bestLead .suffix').hide().html('+').delay(1100).fadeIn(500);
                        $('#bestLead .number').animateNumber({ number: stats.bestLead.replace('5.','').replace('+','').replace('-','') }, 1000);
                        $('#bestTopRope .prefix').html('5.');
                        if(stats.bestTopRope.indexOf('-') > -1)
                            $('#bestTopRope .suffix').hide().html('-').delay(1100).fadeIn(500);
                        if(stats.bestTopRope.indexOf('+') > -1)
                            $('#bestTopRope .suffix').hide().html('+').delay(1100).fadeIn(500);
                        $('#bestTopRope .number').animateNumber({ number: stats.bestTopRope.replace('5.','').replace('+','').replace('-','') }, 1000);

                        // var ctx = document.getElementById('climbingChart').getContext('2d');
                        // var chart = new Chart(ctx).Line(chartData);

                        stats.lastClimb = moment(climbSessions[0].date).fromNow();

                        $scope.climbSessions = climbSessions;
                        $scope.stats = stats;
                    })
                    .error(function(err) {
                        console.error(err);
                    });
            }
        };
    })

    .directive('activitySection', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/adventure/activity.html',
            controller: function($scope) {

            }
        };
    })

    .directive('wowSection', function(WowProfile) {
        return {
            restrict: 'E',
            templateUrl: 'views/gaming/wow.html',
            controller: function($scope) {
                WowProfile.get()
                    .success(function(data) {
                        $scope.wowProfile = data;
                    });

                $scope.percent = function(partial, total) {
                    return parseInt(partial / total * 100);
                };

                $scope.formatProgress = function(partial, total) {
                    return partial + ' / ' + total + ' (' + $scope.percent(partial, total) + '%)';
                };

                $scope.itemQuality = function(quality) {
                    switch(quality) {
                        case 0:
                            return 'trash';
                        case 1:
                            return 'common';
                        case 2:
                            return 'uncommon';
                        case 3:
                            return 'rare';
                        case 4:
                            return 'epic';
                        case 5:
                            return 'legenday';
                    }
                };

                $scope.parseFeedItem = function(feedItem) {
                    switch(feedItem) {
                        case "CRITERIA":
                            return "Completed step of achievement";
                        case "ACHIEVEMENT":
                            return "Earned the achievement";
                        case "BOSSKILL":
                            return "Killed";
                        case "LOOT":
                            return "Looted"
                    }
                };

                $scope.fromNow = function(timestamp) {
                    return moment(timestamp).fromNow();
                };
            }
        }
    })

    .directive('diabloSection', function(DiabloProfile) {
        return {
            restrict: 'E',
            templateUrl: 'views/gaming/diablo.html',
            controller: function($scope) {
                DiabloProfile.get()
                    .success(function(data) {
                        $scope.diabloProfile = data;
                    });

                $scope.percent = function(value) {
                    return parseInt(value * 100);
                }

                $scope.formatSlug = function(slug) {
                    var formatted;
                    var parts = slug.split('-');
                    for(var i = 0; i < parts.length; i++) {
                        parts[i] = capitaliseFirstLetter(parts[i]);
                    }
                    return parts.join(' ');
                }
                function capitaliseFirstLetter(string)
                {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
            }
        }
    })

    .directive('starcraftSection', function(StarcraftProfile) {
        return {
            restrict: 'E',
            templateUrl: 'views/gaming/starcraft.html',
            controller: function($scope) {
                StarcraftProfile.get()
                    .success(function(data) {
                        $scope.starcraftProfile = data;
                    });

                $scope.percent = function(partial, total) {
                    return parseInt(partial / total * 100);
                };

                $scope.formatSlug = function(slug) {
                    var formatted;
                    var parts = slug.split('-');
                    for(var i = 0; i < parts.length; i++) {
                        capitaliseFirstLetter(parts[i]);
                    }
                    return parts.join(' ');
                }
                function capitaliseFirstLetter(string)
                {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
            }
        }
    })

    .directive('steamSection', function(SteamProfile) {
        return {
            restrict: 'E',
            templateUrl: 'views/gaming/steam.html',
            controller: function($scope) {
                SteamProfile.get()
                    .success(function(data) {
                        $scope.steamProfile = data;
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