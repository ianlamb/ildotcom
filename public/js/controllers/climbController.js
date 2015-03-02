angular.module('climbController', []).config(['$httpProvider', function($httpProvider) {
    var token = window.localStorage.getItem('token');
    if (token) {
        $httpProvider.defaults.headers.common = { 'x-access-token': token }
    }
}]).controller('ClimbController', function($scope, Climbs, Places) {

    var token = window.localStorage.getItem('token');
    if (token) {
        $scope.authorized = true;
    }

    var boulderGrades = ['V0','V1','V2','V3','V4','V5','V6','V7','V8','V9','V10','V11','V12','V13','V14','V15'];
    var climbGrades = ['5.5','5.6','5.7','5.8','5.9-','5.9','5.9+','5.10-','5.10','5.10+','5.11-','5.11','5.11+',
                        '5.12-','5.12','5.12+'];

    $scope.boulderGrades = boulderGrades;
    $scope.climbGrades = climbGrades;
    $scope.climbTypes = {
        'Boulder': boulderGrades,
        'Lead': climbGrades,
        'Top Rope': climbGrades
    };
    $scope.newSession = {
        date: moment().format(),
        climbs: []
    };

    $(document).on('click', '[data-action="add-climb"]', function() {
        $scope.$apply(function() {
            var type = $('#type').val();
            var grade = $('#grade option:selected').html();
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
        });
    });

    $(document).on('click', '[data-action="save-session"]', function() {
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
                $scope.message = "Climbing session saved!";
                $scope.newSession = {
                    date: moment().format(),
                    climbs: []
                };
                $scope.climbSessions.unshift(parseClimb(data));
                $scope.stats.lastClimb = moment(climbSessions[0].date).fromNow();
            });
    });

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

            climbSessions.forEach(parseClimb);

            // $('#daysClimbed').animateNumber({ number: $scope.stats.daysClimbed }, 1000);
            // $('#routesClimbed').animateNumber({ number: $scope.stats.routesClimbed }, 1000);
            // $('#problemsClimbed').animateNumber({ number: $scope.stats.problemsClimbed }, 1000);
            // $('#bestBoulder .prefix').html('V');
            // $('#bestBoulder .number').animateNumber({ number: $scope.stats.bestBoulder.replace('V','') }, 1000);
            // $('#bestLead .prefix').html('5.');
            // if($scope.stats.bestLead.indexOf('-') > -1)
            //     $('#bestLead .suffix').hide().html('-').delay(1100).fadeIn(500);
            // if($scope.stats.bestLead.indexOf('+') > -1)
            //     $('#bestLead .suffix').hide().html('+').delay(1100).fadeIn(500);
            // $('#bestLead .number').animateNumber({ number: $scope.stats.bestLead.replace('5.','').replace('+','').replace('-','') }, 1000);
            // $('#bestTopRope .prefix').html('5.');
            // if($scope.stats.bestTopRope.indexOf('-') > -1)
            //     $('#bestTopRope .suffix').hide().html('-').delay(1100).fadeIn(500);
            // if($scope.stats.bestTopRope.indexOf('+') > -1)
            //     $('#bestTopRope .suffix').hide().html('+').delay(1100).fadeIn(500);
            // $('#bestTopRope .number').animateNumber({ number: $scope.stats.bestTopRope.replace('5.','').replace('+','').replace('-','') }, 1000);

            // var ctx = document.getElementById('climbingChart').getContext('2d');
            // var chart = new Chart(ctx).Line(chartData);

            $scope.stats.lastClimb = moment(climbSessions[0].date).fromNow();

            $scope.climbSessions = [];
            var climbCounter;
            for (climbCounter = 0; climbCounter < 10; climbCounter++) {
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

    Places.get()
        .success(function(data) {
            $scope.places = data;
        })
        .error(function(err) {
            console.error(err);
        });

    function parseClimb(session) {
        session.routeCount = 0;
        session.problemCount = 0;
        session.climbs.forEach(function(c) {
            c.mappedSends = [];
            c.sends.forEach(function(s) {
                var res = $.grep(c.mappedSends, function(e){ return e.grade == s; });
                if(res.length == 0) {
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
                    c.mappedSends.push({ grade: s, gradeClass: gradeClass, sends: [s] });
                } else {
                    res[0].sends.push(s)
                }
            });
        });
        $scope.stats.routesClimbed += session.routeCount;
        $scope.stats.problemsClimbed += session.problemCount;
        $scope.stats.daysClimbed++;
        session.climbs.sort(function(a, b) { 
            return a.type > b.type;
        });
        return session;
    }

});
