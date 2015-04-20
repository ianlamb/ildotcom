angular.module('postController', []).controller('PostController', function($scope, $filter, $stateParams, Post) {
    'use strict';

    var slug = $stateParams.slug;
    Post.get(slug)
        .success(function(data) {
            $scope.post = data;
        })
        .error(function(err) {
            console.error(err);
        });

});
