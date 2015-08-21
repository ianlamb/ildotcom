angular.module('app')
    .directive('navbar', function(locale) {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/shared/navbar/navbar-view.html',
            controller: function($scope, $rootScope, $location, $window) {
                // helper for the nav links to determine if they should be highlighted
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
                
                // available locales with labels
                $scope.availableLocales = {
                    "en-CA": "English",
                    "fr-FR": "Français",
                    "es-ES": "Español"
                };
                
                // get current locale which will try cookies first, then grab the default (en-CA)
                $scope.currentLocale = locale.getLocale();
    
                // set locale
                $scope.changeLanguage = function(selectedLocale) {
                    $scope.currentLocale = selectedLocale;
                    locale.setLocale(selectedLocale);
                };
                
                $scope.dropdowns = {
                    navbar: false,
                    language: false
                };
                
                $scope.toggleDropdown = function(dropdown) {
                    $scope.dropdowns[dropdown] = !$scope.dropdowns[dropdown];
                };
                
                $scope.openDropdown = function(dropdown) {
                    dropdown = dropdown || 'navbar';
                    $scope.dropdowns[dropdown] = true;
                };
                
                $scope.closeDropdown = function(dropdown) {
                    dropdown = dropdown || 'navbar';
                    $scope.dropdowns[dropdown] = false;
                };
    
                // scroll to the top of the window to make page changes feel natural
                $rootScope.$on('$stateChangeSuccess', function() {
                    $window.scrollTo(0,0);
                    $scope.closeDropdown();
                });
            }
        };
    });