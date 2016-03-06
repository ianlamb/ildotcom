angular.module('app.adventure.bucket-list')
    .factory('BucketList', ['$http', function($http) {
        'use strict';

        var todoDataCache;

        return {
            get: function() {
                todoDataCache = todoDataCache || $http.get('/api/bucketlist');
                return todoDataCache;
            },
            put: function(data) {
                return $http.put('/api/bucketlist', data);
            },
            delete: function(data) {
                return $http.delete('/api/bucketlist/' + data._id);
            }
        };

    }]);
