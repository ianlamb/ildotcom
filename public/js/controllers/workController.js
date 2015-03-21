angular.module('workController', []).controller('WorkController', function($scope, Projects) {
    'use strict';

    Projects.get()
        .success(function(data) {
            $scope.projects = data;
        })
        .error(function(err) {
            console.error(err);
        });

});
