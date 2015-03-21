angular.module('appDirectives', [])
    .directive('navigation', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/templates/navigation.html',
            controller: function($scope, $location) {
                $scope.navLinks = [
                    { slug: 'home', text: 'Home', sortRank: 0 },
                    { slug: 'work', text: 'Work', sortRank: 1 },
                    { slug: 'adventure', text: 'Adventure', sortRank: 2 },
                    { slug: 'gaming', text: 'Gaming', sortRank: 3 },
                    { slug: 'blog', text: 'Blog', sortRank: 4 },
                    { slug: 'about', text: 'About', sortRank: 5 }
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
            controller: function($rootScope, $location, Auth) {
                $(document).on('keypress', '#login', function(e) {
                    var password = e.target.value;
                    if (e.which === 13) {
                        e.preventDefault();
                        Auth.post(password)
                            .success(function(data, status, headers, config) {
                                window.localStorage.setItem('token', data.token);
                                $.ajaxSetup({
                                    headers: {
                                        'x-access-token': data.token
                                    }
                                });
                                $rootScope.authorized = true;
                                $location.path('/home').replace();
                            })
                            .error(function(data, status, headers, config) {
                                alert('Unauthorized');
                            });
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
                            fill: '#999',
                            'fill-opacity': 1
                        },
                        hover: {
                            fill: '#999',
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
                    {
                        text: 'He who fights with monsters should look to it that he himself does not become a monster. And when you gaze long into an abyss the abyss also gazes into you.',
                        person: 'Friedrich Nietzsche', link: 'http://en.wikiquote.org/wiki/Friedrich_Nietzsche'
                    }
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

    .directive('heatcalendar', function() {
        return {
            restrict: 'E',
            controller: function($scope, $timeout) {
                $timeout(function() {
                    var data = $scope.heatCalendarData;
//                    var data = {
//                        '2015-03-01': 0.1,
//                        '2015-03-02': 0.2,
//                        '2015-03-03': 0.3,
//                        '2015-03-04': 0.4,
//                        '2015-03-05': 0.5,
//                        '2015-03-06': 0.6,
//                        '2015-03-07': 0.7,
//                        '2015-03-08': 0.8,
//                        '2015-03-09': 0.9,
//                        '2015-03-10': 1.0
//                    }
                    
                    var now = new Date();
                    var year = now.getFullYear()
                    var month = now.getMonth()
                    var date = now.getDate();
                    var days = getDays(month, year);
                    var firstDay = new Date(year, month, 1).getDay() + 1;
                    var text = '';
                    text += '<h4 class="title">' + getMonthName(now.getMonth()) + '</h4>';
                    text += '<table>';
                    text += '<thead>';
                    text +=     '<tr>';
                    text +=         '<th>S</th>';
                    text +=         '<th>M</th>';
                    text +=         '<th>T</th>';
                    text +=         '<th>W</th>';
                    text +=         '<th>T</th>';
                    text +=         '<th>F</th>';
                    text +=         '<th>S</th>';
                    text +=     '</tr>';
                    text += '</thead>';
                    text += '<tbody>';

                    var dayOfMonth = 1;
                    var curCell = 1;
                    for (var row = 1; row <= Math.ceil((days + firstDay - 1) / 7); ++row) {
                        text += '<tr>';
                        for (var col = 1; col <= 7; ++col) {
                            var current = new Date(year, month, dayOfMonth).toISOString().split('T')[0];
                            var className = '';
                            var style = '';
                            var cellBody = '';
                            var value = red = green = blue = alpha = 0;
                            if (data[current] > 0) {
                                value = data[current];
                                red = Math.ceil(value * 20 + 20);
                                green = Math.ceil(value * 100 + 75);
                                blue = Math.ceil((value * 255) / 2 + 130);
                                alpha = 0.8;
                                style = 'background: rgba('+red+','+green+','+blue+','+alpha+')';
                            }
                            if (curCell < firstDay) {
                                className = 'lastMonth';
                                curCell++;
                            } else if (dayOfMonth > days) {
                                className = 'nextMonth';
                            } else {
                                if (dayOfMonth == date) {
                                    className = 'today';
                                }
                                cellBody = dayOfMonth;
                                dayOfMonth++;
                            }
                            text += '<td class="' + className + '" style="' + style + '">' + cellBody + '</td>';
                        }
                        text += '</tr>';
                    }

                    text += '</tbody>';
                    text += '</table>';
                    var container = document.getElementsByTagName('heatcalendar')[0];
                    container.className = 'heatCalendar';
                    container.innerHTML = text;
                }, 200);

                function leapYear(year) {
                    if (year % 4 == 0) // basic rule
                    return true // is leap year
                    /* else */ // else not needed when statement is "return"
                    return false // is not leap year
                }

                function getDays(month, year) {
                    var ar = new Array(12)
                    ar[0] = 31 // January
                    ar[1] = (leapYear(year)) ? 29 : 28 // February
                    ar[2] = 31 // March
                    ar[3] = 30 // April
                    ar[4] = 31 // May
                    ar[5] = 30 // June
                    ar[6] = 31 // July
                    ar[7] = 31 // August
                    ar[8] = 30 // September
                    ar[9] = 31 // October
                    ar[10] = 30 // November
                    ar[11] = 31 // December
                    return ar[month]
                }

                function getMonthName(month) {
                    var ar = new Array(12)
                    ar[0] = "January"
                    ar[1] = "February"
                    ar[2] = "March"
                    ar[3] = "April"
                    ar[4] = "May"
                    ar[5] = "June"
                    ar[6] = "July"
                    ar[7] = "August"
                    ar[8] = "September"
                    ar[9] = "October"
                    ar[10] = "November"
                    ar[11] = "December"
                    return ar[month]
                }
            }
        }
    });
