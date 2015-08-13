angular.module('ildotcomApp')
    .directive('footer', function() {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'shared/footer/footer-view.html',
            controller: function($scope) {
                $scope.year = moment().year();
            }
        };
    })