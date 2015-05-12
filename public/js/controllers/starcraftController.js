angular.module('starcraftController', [])
    .controller('StarcraftController', function($scope, StarcraftProfile, Utilities) {
    'use strict';

    StarcraftProfile.get()
        .success(function(data) {
            $scope.starcraftProfile = data;
        });

    $scope.percent = function(partial, total) {
        return parseInt(partial / total * 100);
    };

    $scope.formatSlug = Utilities.formatSlug;

});
