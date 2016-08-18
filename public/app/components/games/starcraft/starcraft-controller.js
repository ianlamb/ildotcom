angular.module('app.games.starcraft', [])
    .controller('StarcraftController', function($scope, StarcraftProfile, Utilities) {
    'use strict';

    StarcraftProfile.get()
        .success(function(data) {
            $scope.starcraftProfile = data;
            $scope.starcraftProfile.battleTag = 'Sorry#127';
        });

    $scope.formatSlug = Utilities.formatSlug;

});
