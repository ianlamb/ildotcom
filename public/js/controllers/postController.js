angular.module('postController', []).controller('PostController', function($scope, $filter, $stateParams, Post) {
    'use strict';
    
    $scope.markdown = markdown;
    $scope.editing = false;
    $scope.saving = false;

    var slug = $stateParams.slug;
    Post.get(slug)
        .success(function(data) {
            $scope.post = data;
        })
        .error(function(err) {
            console.error(err);
        });

    $scope.editPost = function (post) {
        post.tags = post.tags.join(' ');
        $scope.modifiedPost = post;
        $scope.editing = true;
    };

    $scope.saveEdits = function (post) {
        $scope.saving = true;
        post.title = post.title.trim();
        post.body = post.body.trim();
        post.tags = post.tags.trim().split(' ');

        Post.put(post)
            .then(function success() {}, function error() {
                $scope.post = post;
            })
            .finally(function () {
                $scope.editedPost = null;
                $scope.editing = false;
                $scope.saving = false;
            });
    };

    $scope.removePost = function (post) {
        Post.delete(post)
            .success(function() {
                for (var i = 0; i < $scope.posts.length; i++) {
                    if ($scope.posts[i]._id == post._id) {
                        $scope.posts.splice(i, 1);
                    }
                }
            });
    };
    
});
