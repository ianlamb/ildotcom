angular.module('app')
    .directive('footer', function() {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/shared/footer/footer-view.html',
            controller: function($scope, $rootScope) {
                $scope.year = moment().year();
            }
        };
    });