angular.module('mainController', []).controller('MainController', function($scope, $rootScope, $window, $location, $state) {
    
    var token = window.localStorage.getItem('token');
    if (token) {
        $rootScope.authorized = true;
    }

    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
        if (toState.name === 'adventure') { 
            e.preventDefault();
            $state.go('adventure.travel');
        }
        if (toState.name === 'gaming') { 
            e.preventDefault();
            $state.go('gaming.wow');
        }
        $window.scrollTo(0,0);
    });

    $rootScope.moment = moment;

    $scope.$on('$viewContentLoaded', function(event) {
        $window.ga('send', 'pageview', { page: $location.url() });
        $(".navbar-collapse.collapse.in").collapse('hide');
    });

});