angular.module('app.blog')
    .controller('PostController', function($scope, $filter, $state, $stateParams, $location, Post, Utilities) {
    'use strict';
    
    $scope.markdown = markdown;
    $scope.editing = false;
    $scope.saving = false;

    var slug = $stateParams.slug;
    Post.get(slug)
        .success(function(post) {
            if (!post) {
                $location.path('/blog').replace();
            }
            post.tags = post.tags instanceof Array ? post.tags.join(' ') : post.tags;
            $scope.post = post;
        })
        .error(function(err) {
            console.error(err);
        });

    $scope.editPost = function (post) {
        post.tags = post.tags instanceof Array ? post.tags.join(' ') : post.tags;
        $scope.originalPost = post;
        $scope.editing = true;
    };

    $scope.saveEdits = function () {
        $scope.saving = true;
        $scope.post.tags = $scope.post.tags.trim().split(' ');
        $scope.post.slug = Utilities.slugify($scope.post.title);

        Post.put($scope.post)
            .success(function() {
                $scope.alert = { type: 'success', message: 'Post was saved successfully' };
            })
            .error(function() {
                $scope.post = $scope.originalPost;
                $scope.alert = { type: 'danger', message: 'Error while saving post' };
            })
            .finally(function () {
                $scope.post.tags = $scope.post.tags instanceof Array ? $scope.post.tags.join(' ') : $scope.post.tags;
                $scope.editing = false;
                $scope.saving = false;
            });
    };

    $scope.cancelEdits = function () {
        $scope.post = $scope.originalPost;
        $scope.editing = false;
    };

    $scope.removePost = function (post) {
        Post.delete(post)
            .success(function() {
                for (var i = 0; i < $scope.posts.length; i++) {
                    if ($scope.posts[i]._id === post._id) {
                        $scope.posts.splice(i, 1);
                    }
                }
            });
    };
});
