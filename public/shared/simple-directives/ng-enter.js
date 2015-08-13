angular.module('ildotcomApp')
    .directive('ngEnter', function () {
        'use strict';

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