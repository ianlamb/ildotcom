angular.module('ildotcomApp')
    .directive('navbar', function() {
        'use strict';

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'shared/navbar/navbar-view.html',
            controller: function($scope, $location) {
                $scope.navLinks = [
                    { slug: 'home', text: 'Home', sortRank: 0 },
                    { slug: 'blog', text: 'Journal', sortRank: 1 },
                    //{ slug: 'work', text: 'Work', sortRank: 2 },
                    { slug: 'resume', text: 'Résumé', sortRank: 3 },
                    { slug: 'adventure', text: 'Adventure', sortRank: 4 },
                    { slug: 'gaming', text: 'Gaming', sortRank: 5 },
                    { slug: 'about', text: 'About', sortRank: 6 }
                ];

                $scope.isActive = function(slug) {
                    var baseNav;
                    var urlParts = $location.path().split('/');
                    if (urlParts.length > 1 && urlParts[1] !== '') {
                        baseNav = urlParts[1];
                    } else {
                        baseNav = 'home';
                    }
                    if(baseNav === slug) {
                        return 'active';
                    }
                    return '';
                };
            }
        };
    })