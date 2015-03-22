angular.module('climbController', []).controller('ClimbController', function($scope, $rootScope, Climbs, Places) {
    'use strict';

    var boulderGrades = ['V0','V1','V2','V3','V4','V5','V6','V7','V8','V9','V10','V11','V12','V13','V14','V15'];
    var climbGrades = ['5.5','5.6','5.7','5.8','5.9-','5.9','5.9+','5.10-','5.10','5.10+','5.11-','5.11','5.11+',
                        '5.12-','5.12','5.12+'];

    $scope.messages = [];
    $scope.boulderGrades = boulderGrades;
    $scope.climbGrades = climbGrades;
    $scope.climbTypes = {
        'Boulder': ['V0','V1','V2','V3','V4','V5','V6','V7','V8','V9','V10','V11','V12','V13','V14','V15'],
        'Lead': ['5.5','5.6','5.7','5.8','5.9-','5.9','5.9+','5.10-','5.10','5.10+','5.11-','5.11','5.11+',
                        '5.12-','5.12','5.12+'],
        'Top Rope': ['5.5','5.6','5.7','5.8','5.9-','5.9','5.9+','5.10-','5.10','5.10+','5.11-','5.11','5.11+',
                        '5.12-','5.12','5.12+']
    };
    $scope.newSession = {
        date: moment().format(),
        climbs: []
    };
    
    $scope.addSend = function() {
        var type = $('#type').val();
        var grade = $('#grade option:selected').html();
        if(!grade) {
            alert('Type and grade required');
            return;
        }
        var typeExists = false;
        for (var i = 0; i < $scope.newSession.climbs.length; i++) {
            if ($scope.newSession.climbs[i].type === type) {
                $scope.newSession.climbs[i].sends.push(grade);
                typeExists = true;
                break;
            }
        }
        if (!typeExists) {
            $scope.newSession.climbs.push({ type: type, sends: [grade] });
        }
    };

    $scope.saveSession = function() {
        $scope.newSession.place = $('#place').val();
        $scope.newSession.date = $('#timestamp').val();
        if(!$scope.newSession.place) {
            alert('Place required');
            return;
        }
        if($scope.newSession.climbs.length === 0) {
            alert('No climbs entered');
            return;
        }
        Climbs.put($scope.newSession)
            .success(function(data) {
                var latestClimb = parseClimb(data);
                if (typeof latestClimb.place !== 'object') {
                    $scope.places.forEach(function(place) {
                        if (place._id === latestClimb.place) {
                            latestClimb.place = place;
                        }
                    });
                }
            
                $scope.messages.push({ type: 'success', body: 'Climbing session saved!' });
                $scope.newSession = {
                    date: moment().format(),
                    climbs: []
                };
                $scope.climbSessions.unshift(latestClimb);
                $scope.stats.lastClimb = moment(latestClimb.date).fromNow();
            });
    };

    Climbs.get()
        .success(function(data) {
            $scope.stats = {
                daysClimbed: 0,
                routesClimbed: 0,
                problemsClimbed: 0,
                bestBoulder: boulderGrades[0],
                bestLead: climbGrades[0],
                bestTopRope: climbGrades[0]
            };
            var climbSessions = data;

            $scope.heatCalendarData = {};
            climbSessions.forEach(parseClimb);

            $scope.stats.lastClimb = moment(climbSessions[0].date).fromNow();

            $scope.climbSessions = [];
            var climbCounter;
            for (climbCounter = 0; climbCounter < 10 && climbSessions[climbCounter]; climbCounter++) {
                $scope.climbSessions.push(climbSessions[climbCounter]);
            }

            $scope.loadMore = function() {
                if(climbSessions[climbCounter+1]) {
                    $scope.climbSessions.push(climbSessions[climbCounter++]);
                }
            };
        })
        .error(function(err) {
            console.error(err);
        });

    if ($rootScope.authorized) {
        Places.get()
            .success(function(data) {
                $scope.places = data;
            })
            .error(function(err) {
                console.error(err);
            });
    }

    function parseClimb(session) {
        session.routeCount = 0;
        session.problemCount = 0;
        session.climbs.forEach(function(c) {
            c.mappedSends = [];
            c.sends.forEach(function(s) {
                var res = $.grep(c.mappedSends, function(e){ return e.grade == s; });
                var gradeClass;
                switch(c.type) {
                case 'Boulder':
                    gradeClass = s;
                    if(boulderGrades.indexOf(s) > boulderGrades.indexOf($scope.stats.bestLead))
                        $scope.stats.bestBoulder = s;
                    session.problemCount++;
                    break;
                case 'Lead':
                    gradeClass = 'five' + s.replace('5.','').replace('+','').replace('-','');
                    if(climbGrades.indexOf(s) > climbGrades.indexOf($scope.stats.bestLead))
                        $scope.stats.bestLead = s;
                    session.routeCount++;
                    break;
                case 'Top Rope':
                    gradeClass = 'five' + s.replace('5.','').replace('+','').replace('-','');
                    if(climbGrades.indexOf(s) > climbGrades.indexOf($scope.stats.bestTopRope))
                        $scope.stats.bestTopRope = s;
                    session.routeCount++;
                    break;
                }
                if(res.length == 0) {
                    c.mappedSends.push({ grade: s, gradeClass: gradeClass, sends: [s] });
                } else {
                    res[0].sends.push(s);
                }
            });
        });
        
        var now = new Date(),
            year = now.getFullYear(),
            month = now.getMonth(),
            sessionDate = moment(session.date).toDate();
        if (sessionDate.getFullYear() === year && sessionDate.getMonth() === month) {
            var weightFactor = 5;
            var climbValue = ((session.routeCount*2) + session.problemCount) * weightFactor;
            var heatValue = climbValue / 100;
            if (heatValue > 1) {
                heatValue = 1;
            }
            $scope.heatCalendarData[session.date.split('T')[0]] = heatValue;
        }
        
        $scope.stats.routesClimbed += session.routeCount;
        $scope.stats.problemsClimbed += session.problemCount;
        $scope.stats.daysClimbed++;
        
        return session;
    }

});
