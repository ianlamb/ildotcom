angular.module('app.photos')
    .factory('Albums', ['$http', function($http) {
        'use strict';

        var photosDataCache;

        function getAlbums() {
            photosDataCache = photosDataCache || $http.get('/api/albums');
            return photosDataCache;
        }

        return {
            get: getAlbums,
        };

    }]);
