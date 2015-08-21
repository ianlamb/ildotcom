angular.module('app')
    .directive('worldMap', function() {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            scope: {
                markers: '=',
                theme: '='
            },
            controller: function($scope, $element, $timeout) {
                $scope.$watch('markers', function() {
                    if (!$scope.markers) {
                        return;
                    }
                    Raphael(0, 20, 1000, 400, function () {
                        var r = this;
                        r.canvas.style.position = 'relative';
                        r.rect(0, 0, 1000, 400, 10).attr({
                            stroke: "none",
                            fill: "transparent"
                        });
                        r.setStart();
                        
                        // move svg element to this directive
                        $element[0].appendChild(r.canvas);
                        
                        // colour the countries
                        for (var country in worldmap.shapes) {
                            r.path(worldmap.shapes[country]).attr({strike: 'transparent', fill: '#57646B', "stroke-opacity": 0.25});
                        }
                        var world = r.setFinish();
                        
                        // set the hover effects
                        var over = function () {
                                this.c = this.c || this.attr("fill");
                                this.stop().animate({fill: "#bacabd"}, 500);
                            },
                            out = function () {
                                this.stop().animate({fill: this.c}, 500);
                            };
                        world.hover(over, out);
                        
                        // lat/long helper functions
                        world.getXY = function (lat, lon) {
                            return {
                                cx: lon * 2.6938 + 465.4,
                                cy: lat * -2.6938 + 227.066
                            };
                        };
                        world.getLatLon = function (x, y) {
                            return {
                                lat: (y - 227.066) / -2.6938,
                                lon: (x - 465.4) / 2.6938
                            };
                        };
        
                        // place markers
                        $scope.markers.forEach(function(marker) {
                            r.circle()
                                .attr({fill: $scope.theme.markerFill, stroke: $scope.theme.markerStroke, r: $scope.theme.markerRadius})
                                .attr(world.getXY(marker.latitude, marker.longitude));
                        });
                    });
                });
            }
        };
    });