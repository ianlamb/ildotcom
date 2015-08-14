angular.module('app')
    .directive('footer', function() {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/shared/footer/footer-view.html',
            controller: function($scope) {
                $scope.year = moment().year();
            }
        };
    });