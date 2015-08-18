angular.module('app')
    .directive('navbar', function(locale) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/shared/navbar/navbar-view.html',
            controller: function($scope, $location) {
                $scope.isActive = function(slug) {
                    var baseNav;
                    var urlParts = $location.path().split('/');
                    if (urlParts.length > 1 && urlParts[1] !== '') {
                        baseNav = urlParts[1];
                    } else {
                        baseNav = 'home';
                    }
                    if(baseNav === slug) {
                        return 'active';
                    }
                    return '';
                };
                
                $scope.availableLocales = {
                    "en-CA": "English",
                    "fr-FR": "Français",
                    "es-ES": "Español"
                };
                $scope.currentLocale = locale.getLocale();
    
                $scope.changeLanguage = function(selectedLocale) {
                    $scope.currentLocale = selectedLocale;
                    locale.setLocale(selectedLocale);
                };
                
                $scope.getCountryCode = function(selectedLocale) {
                    return selectedLocale.split('-')[1];
                };
            }
        };
    });