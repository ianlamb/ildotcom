angular.module('app.adventure.bucket-list')
    .factory('BucketList', ['$http', function($http) {
        'use strict';

        return {
            get: function() {
                return $http.get('/api/bucketlist');
            },
            put: function(data) {
                return $http.put('/api/bucketlist', data);
            },
            delete: function(data) {
                return $http.delete('/api/bucketlist/' + data._id);
            }
        };

    }]);
