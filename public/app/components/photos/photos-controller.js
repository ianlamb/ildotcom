angular.module('app.photos', [])
    .controller('PhotosController',
        function($scope, Albums) {
        'use strict';

        Albums.get()
            .then(function(res) {
                $scope.albums = res.data.albums;
            })
            .catch(function(err) {
                console.error(err);
            });

    });
