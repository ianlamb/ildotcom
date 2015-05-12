angular.module('diabloController', [])
    .controller('DiabloController', function($scope, DiabloProfile, Utilities) {
    'use strict';

    DiabloProfile.get()
        .success(function(data) {
            $scope.diabloProfile = data;
        });

    $scope.getClassSlug = function(hero) {
        return hero.class + '-' + (hero.gender ? 'female' : 'male');
    };

    $scope.percent = function(value) {
        return parseInt(value * 100);
    };
    
    $scope.sluggify = Utilities.sluggify;
    $scope.formatSlug = Utilities.formatSlug;

});
