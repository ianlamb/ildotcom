angular.module('app.adventure')
    .factory('Trips', ['$http', function($http) {
        'use strict';

        return {
            get: function() {
                return $http.get('/api/trips');
            }
        };

    }])

    .factory('Climbs', ['$http', function($http) {
        'use strict';

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
        'use strict';

        return {
            get: function() {
                return $http.get('/api/places');
            },
            getCities: function() {
                return $http.get('/api/cities');
            },
            put: function(data) {
                return $http.put('/api/place', data);
            },
            delete: function(data) {
                return $http.delete('/api/place/' + data._id);
            }
        };

    }])

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
