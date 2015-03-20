angular.module('adventureService', [])
    .factory('Trips', ['$http', function($http) {

        return {
            get: function() {
                return $http.get('/api/trips');
            }
        };

    }])

    .factory('Climbs', ['$http', function($http) {

        return {
            get: function() {
                return $http.get('/api/climbs');
            },
            put: function(data) {
                return $http.put('/api/climb', data);
            }
        };

    }])

    .factory('Places', ['$http', function($http) {

        return {
            get: function() {
                return $http.get('/api/places');
            }
        };

    }])

    .factory('BucketList', ['$http', function($http) {

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
