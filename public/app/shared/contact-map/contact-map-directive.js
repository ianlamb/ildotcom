angular.module('app')
    .directive('contactMap', function() {
        'use strict';

        return {
            restrict: 'A',
            replace: true,
            controller: function($scope, $element, $timeout) {
                // wrap with $timeout to prevent the rendering occurring before ng-cloak resolves
                // and messing up the sizing of the map
                $timeout(function() {
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
                        markers: [$scope.contact.location]
                    });
                }, 500);
            }
        };
    });