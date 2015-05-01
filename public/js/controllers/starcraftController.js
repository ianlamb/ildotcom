angular.module('starcraftController', []).controller('StarcraftController', function($scope, StarcraftProfile) {

    StarcraftProfile.get()
        .success(function(data) {
            $scope.starcraftProfile = data;
        });

    $scope.percent = function(partial, total) {
        return parseInt(partial / total * 100);
    };

    $scope.formatSlug = function(slug) {
        var formatted;
        var parts = slug.split('-');
        for(var i = 0; i < parts.length; i++) {
            capitaliseFirstLetter(parts[i]);
        }
        return parts.join(' ');
    };

    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

});
