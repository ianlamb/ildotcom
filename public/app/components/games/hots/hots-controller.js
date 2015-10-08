angular.module('app.games.hots', [])
    .controller('HotsController', function($scope, HotsProfile, Utilities) {
    'use strict';

    HotsProfile.get()
        .success(function(data) {
            $scope.hotsProfile = data;
        });

});
