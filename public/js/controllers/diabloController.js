angular.module('diabloController', []).controller('DiabloController', function($scope, DiabloProfile) {

    DiabloProfile.get()
        .success(function(data) {
            $scope.diabloProfile = data;
        });

    $scope.getClassSlug = function(hero) {
        return hero.class + '-' + (hero.gender ? 'female' : 'male');
    }

    $scope.percent = function(value) {
        return parseInt(value * 100);
    }
    
    $scope.sluggify = function(text) {
        return text.toLowerCase().split('\'').join('').split(' ').join('-');
    }

    $scope.formatSlug = function(slug) {
        var formatted;
        var parts = slug.split('-');
        for(var i = 0; i < parts.length; i++) {
            parts[i] = capitaliseFirstLetter(parts[i]);
        }
        return parts.join(' ');
    }
    function capitaliseFirstLetter(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

});
