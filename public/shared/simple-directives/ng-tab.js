angular.module('ildotcomApp')
    .directive('ngTab', function () {
        'use strict';

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