angular.module('app')
    .directive('stickyHero', function () {
        'use strict';

        return {
            restrict: 'E',
            scope: { obj: '=' },
            template: '<div class="sticky-hero" style="top: {{top}}"><div class="sticky-hero-overlay"></div></div><div class="sticky-hero-shim"></div>',
            controller: function ($scope, $element, $window) {
                $scope.top = 0;
                $window.addEventListener('scroll', function () {
                    var hero = $element[0].querySelector('.sticky-hero');
                    var heroHeight = hero.offsetHeight;
                    var navbarHeight = 50;
                    var newOffset = 0;
                    var oldOffset = parseInt($scope.top, 10);
                    newOffset = $window.scrollY * -1;
                    newOffset = Math.max(newOffset, navbarHeight - heroHeight);
                    if (newOffset != oldOffset) {
                        $scope.top = newOffset + 'px';
                        $scope.$apply();
                    }
                });
            }
        };
    });