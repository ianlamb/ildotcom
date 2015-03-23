angular.module('workController', []).controller('WorkController', function($scope, $stateParams, $location, Projects) {
    'use strict';
    
    Projects.get()
        .success(function(data) {
            var projects = $scope.projects = data;
            projects.forEach(function(proj) {
                if (proj.slug === $stateParams.slug) {
                    $scope.project = proj;
                }
            });            
        })
        .error(function(err) {
            console.error(err);
        });

});
