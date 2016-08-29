angular.module('app.timeline', [])
    .controller('TimelineController',
        function($scope) {
        'use strict';

        var imagePath = '/assets/images/timeline/';
        var events = [
            {
                name: 'Born in Zorra, Ontario',
                date: new Date('1991-10-15Z12:00:00'),
                image: 'igloo-real-tools_h.jpg'
            },
            {
                name: 'Moved to Ingersoll, Ontario',
                date: new Date('1995-01-01Z12:00:00'),
                image: ''
            },
            {
                name: 'Played my first video game, Menzoberranzan',
                date: new Date('1996-01-01Z12:00:00'),
                image: 'menzoberranzan.jpg'
            },
            {
                name: 'Moved to London, Ontario',
                date: new Date('1999-01-01Z12:00:00'),
                image: ''
            },
            {
                name: 'Graduated from AB Lucas Secondary School',
                date: new Date('2009-12-15Z12:00:00'),
                image: ''
            },
            {
                name: 'First car, a silver 2000 Ford Mustang V6',
                date: new Date('2010-10-15Z12:00:00'),
                image: 'P1000395.JPG'
            },
            {
                name: 'First motorcycle, a 2002 Suzuki GS500',
                date: new Date('2012-06-15Z12:00:00'),
                image: 'IMG-20120704-00046.jpg'
            },
            {
                name: 'Graduated from Fanshawe College',
                date: new Date('2012-12-01Z12:00:00'),
                image: '16112621242_f965dd80f5_k.jpg'
            },
            {
                name: 'Moved into my first apartment',
                date: new Date('2013-01-01Z12:00:00'),
                image: ''
            },
            {
                name: 'Started working at GoodLife Fitness',
                date: new Date('2013-01-01Z12:00:00'),
                image: ''
            },
            {
                name: 'Started working at EK3 Technologies',
                date: new Date('2014-06-01Z12:00:00'),
                image: ''
            },
            {
                name: 'Started dating Katherine <3',
                date: new Date('2014-07-02Z12:00:00'),
                image: '20160520_193119.jpg'
            },
            {
                name: 'First time climbing outdoors, Rattlesnake Point',
                date: new Date('2014-09-19Z12:00:00'),
                image: 'IMG_20140920_144920.jpg'
            },
            {
                name: 'First cosplay, Iron Drakken Sven from Dota 2',
                date: new Date('2014-07-02Z12:00:00'),
                image: 'IMG_20150523_152931_hdr.jpg'
            },
            {
                name: 'Job offer from Blizzard',
                date: new Date('2015-08-29Z12:00:00'),
                image: 'Blizzard_Entertainment_HQ_statue.jpg'
            },
            {
                name: 'Moved to Irvine, California',
                date: new Date('2015-12-31Z12:00:00'),
                image: ''
            }
        ];

        $scope.events = calcEventOffsets(events);

        $scope.getImageUrl = function(imageName) {
            return imagePath + imageName;
        }

        $scope.getContainerHeight = function() {
            return $scope.events[$scope.events.length - 1].offset + 300;
        }

        function calcEventOffsets(events) {
            var offset = 0;
            for (var i = 0; i < events.length; i++) {
                events[i].offset = offset;
                offset += 300;
            }
            return events;
        }

    });
