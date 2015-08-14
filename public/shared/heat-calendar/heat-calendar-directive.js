angular.module('app')
    .directive('heatCalendar', function() {
        'use strict';

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
//                    };
                    
                    var now = new Date();
                    var year = now.getFullYear();
                    var month = now.getMonth();
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
                            var value = 0, red = 0, green = 0, blue = 0, alpha = 0;
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
                                if (dayOfMonth === date) {
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
                    if (year % 4 === 0) {
                        return true;
                    }
                    return false;
                }

                function getDays(month, year) {
                    var daysInMonths = [
                        31, // January
                        (leapYear(year)) ? 29 : 28, // February
                        31, // March
                        30, // April
                        31, // May
                        30, // June
                        31, // July
                        31, // August
                        30, // September
                        31, // October
                        30, // November
                        31]; // December

                    return daysInMonths[month];
                }

                function getMonthName(month) {
                    var months = [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"];

                    return months[month];
                }
            }
        };
    })