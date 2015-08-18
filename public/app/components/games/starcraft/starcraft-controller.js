angular.module('app.games.starcraft', [])
    .controller('StarcraftController', function($scope, StarcraftProfile, Utilities) {
    'use strict';

    StarcraftProfile.get()
        .success(function(data) {
            $scope.starcraftProfile = data;
        });

    $scope.formatSlug = Utilities.formatSlug;

});
