/* global angular, moment */
angular.module('app')
    .directive('heatCalendar', function(Utilities) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: { data: '=' },
            templateUrl: '/app/shared/heat-calendar/heat-calendar-view.html',
            controller: function($scope, $element, $timeout) {
                var DATE_FORMAT_STRING = 'YYYY-MM-DD';
                
                $scope.now = moment();
                $scope.today = $scope.now.format(DATE_FORMAT_STRING);
                $scope.title = $scope.now.format('MMMM');
                $scope.weeks = [];
                
                var year = $scope.now.year();
                var month = $scope.now.month();
                var days = Utilities.daysInMonth(month, year);
                var firstDay = new Date(year, month, 1).getDay() + 1;
                var currentDate = moment(new Date(year, month, 1)).subtract((firstDay), 'days');
                var dayOfMonth = 1;
                var maxRows = Math.ceil((days + firstDay - 1) / 7);
                // build the full calendar grid with day objects for current month
                for (var row = 1; row <= maxRows; ++row) {
                    var week = {};
                    for (var col = 1; col <= 7; ++col) {
                        currentDate = currentDate.add(1, 'days');
                        var day = {};
                        if (currentDate.month() === month) {
                            day.number = dayOfMonth++;
                        }
                        week[currentDate.format(DATE_FORMAT_STRING)] = day;
                    }
                    $scope.weeks.push(week);
                }
                
                // highlight the days that have values associate with them
                $scope.$watch('data', function() {
                    for(var key in $scope.data) {
                        for(var i = 0; i < $scope.weeks.length; i++) {
                            var week = $scope.weeks[i];
                            if (week.hasOwnProperty(key)) {
                                week[key].refId = $scope.data[key].refId;
                                week[key].style = parseStyle($scope.data[key].value);
                            }
                        }
                    }
                }, true);
                
                // click handler to scroll to a reference ID
                $scope.scrollTo = function(id) {
                    var toElement = document.getElementById(id);
                    Utilities.scrollTo(document.body, toElement.offsetTop + toElement.offsetParent.offsetTop - 10, 800);
                };
                
                function parseStyle(value) {
                    // i really suck at math, this is a terrible way to map a hugh of blue to the factor value (0-1)
                    var red = Math.ceil(value * 20 + 20);
                    var green = Math.ceil(value * 100 + 75);
                    var blue = Math.ceil((value * 255) / 2 + 130);
                    var alpha = 0.8;
                    return 'background: rgba('+red+','+green+','+blue+','+alpha+')';
                }
            }
        };
    });