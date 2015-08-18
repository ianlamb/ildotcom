angular.module('app.games.diablo', [])
    .controller('DiabloController', function($scope, DiabloProfile, Utilities) {
    'use strict';

    DiabloProfile.get()
        .success(function(data) {
            $scope.diabloProfile = data;
        });

    $scope.getClassSlug = function(hero) {
        return hero.class + '-' + (hero.gender ? 'female' : 'male');
    };
    
    $scope.sluggify = Utilities.sluggify;
    $scope.formatSlug = Utilities.formatSlug;

});
