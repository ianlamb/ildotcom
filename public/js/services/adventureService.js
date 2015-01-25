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
            }
        };

    }]);
