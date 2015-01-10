angular.module('adventureService', [])
    .factory('Climbs', ['$http', function($http) {

        return {
            get: function() {
                return $http.get('/api/climbs');
            }
        };

    }]);
