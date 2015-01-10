angular.module('devService', [])
    .factory('Projects', ['$http', function($http) {

        return {
            get: function() {
                return $http.get('/api/projects');
            }
        };

    }]);
