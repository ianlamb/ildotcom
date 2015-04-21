angular.module('appDirectives', [])

    .directive('navbar', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'views/templates/navbar.html',
            controller: function($scope, $location) {
                $scope.navLinks = [
                    { slug: 'home', text: 'Home', sortRank: 0 },
                    { slug: 'blog', text: 'Journal', sortRank: 1 },
                    //{ slug: 'work', text: 'Work', sortRank: 2 },
                    { slug: 'resume', text: 'Résumé', sortRank: 3 },
                    { slug: 'adventure', text: 'Adventure', sortRank: 4 },
                    { slug: 'gaming', text: 'Gaming', sortRank: 5 },
                    { slug: 'about', text: 'About', sortRank: 6 }
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
            replace: true,
            templateUrl: 'views/templates/footer.html',
            controller: function($scope) {
                $scope.year = moment().year();
            }
        };
    })

    .directive('contactMap', function() {
        return {
            restrict: 'A',
            replace: true,
            controller: function($scope, $element) {
                $($element).vectorMap({
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
                    markers: [$scope.location]
                });
            }
        };
    })

    .directive('heatCalendar', function() {
        return {
            restrict: 'E',
            replace: true,
            controller: function($scope, $element, $timeout) {
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
                    var container = $element[0];
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
    })

    .directive('ngTab', function () {
        return function (scope, element, attrs) {
            element.bind('keydown', function (event) {
                var TAB_KEY = 9;
                if(event.which === TAB_KEY) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngTab);
                    });
                    event.preventDefault();
                }
            });
        };
    })

    .directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind('keypress', function (event) {
                var ENTER_KEY = 13;
                if(event.which === ENTER_KEY) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        };
    });
