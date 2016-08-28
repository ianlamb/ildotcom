angular.module('app.timeline', [])
    .controller('TimelineController',
        function($scope) {
        'use strict';

        $scope.events = [
            {
                name: 'Born',
                date: new Date('1991-10-15'),
                imageUrl: ''
            }
        ];

    });
