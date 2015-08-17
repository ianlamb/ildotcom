angular.module('app')
	.directive('ngLanguageSelect', function (locale) {
        'use strict';

        return {
            restrict: 'A',
            replace: true,
            templateUrl: 'app/shared/language-select/language-select-view.html',
            controller: function ($scope) {
                $scope.localesDisplayNames = {
                    "en-CA": "English",
                    "fr-FR": "French"
                };
                $scope.currentLocale = locale.getLocale();
    
                $scope.changeLanguage = function (selectedLocale) {
                    locale.setLocale(selectedLocale);
                };
            }
        };
    });