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

    $scope.moment = moment;
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
            });
    });

    Climbs.get()
        .success(function(data) {
            $scope.stats = {
                daysClimbed: 0,
                routesClimbed: 0,
                bestBoulder: boulderGrades[0],
                bestLead: climbGrades[0],
                bestTopRope: climbGrades[0]
            };
            var climbSessions = data;

            climbSessions.forEach(parseClimb);
            $scope.stats.daysClimbed = climbSessions.length;

            $('#daysClimbed').animateNumber({ number: $scope.stats.daysClimbed }, 1000);
            $('#routesClimbed').animateNumber({ number: $scope.stats.routesClimbed }, 1000);
            $('#bestBoulder .prefix').html('V');
            $('#bestBoulder .number').animateNumber({ number: $scope.stats.bestBoulder.replace('V','') }, 1000);
            $('#bestLead .prefix').html('5.');
            if($scope.stats.bestLead.indexOf('-') > -1)
                $('#bestLead .suffix').hide().html('-').delay(1100).fadeIn(500);
            if($scope.stats.bestLead.indexOf('+') > -1)
                $('#bestLead .suffix').hide().html('+').delay(1100).fadeIn(500);
            $('#bestLead .number').animateNumber({ number: $scope.stats.bestLead.replace('5.','').replace('+','').replace('-','') }, 1000);
            $('#bestTopRope .prefix').html('5.');
            if($scope.stats.bestTopRope.indexOf('-') > -1)
                $('#bestTopRope .suffix').hide().html('-').delay(1100).fadeIn(500);
            if($scope.stats.bestTopRope.indexOf('+') > -1)
                $('#bestTopRope .suffix').hide().html('+').delay(1100).fadeIn(500);
            $('#bestTopRope .number').animateNumber({ number: $scope.stats.bestTopRope.replace('5.','').replace('+','').replace('-','') }, 1000);

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
        session.dateFriendly = moment(session.date).format('MMMM Do, YYYY');
        session.dateFormatted = moment(session.date).format('YYYY-MM-DD');
        session.dateStandard = moment(session.date.split('T')[0]).format('YYYY-MM-DD');
        session.sendCount = 0;
        var topSendsForComp = [];
        session.climbs.forEach(function(c) {
            c.mappedSends = [];
            c.sends.forEach(function(s) {
                var res = $.grep(c.mappedSends, function(e){ return e.grade == s; });
                if(res.length == 0) {
                    var gradeClass;
                    switch(c.type) {
                    case 'Boulder':
                        if(c.purpose === 'comp') {
                            gradeClass = 'points';
                        } else {
                            gradeClass = s;
                            if(boulderGrades.indexOf(s) > boulderGrades.indexOf($scope.stats.bestLead))
                                $scope.stats.bestBoulder = s;
                        }
                        break;
                    case 'Lead':
                        gradeClass = 'five' + s.replace('5.','').replace('+','').replace('-','');
                        if(climbGrades.indexOf(s) > climbGrades.indexOf($scope.stats.bestLead))
                            $scope.stats.bestLead = s;
                        break;
                    case 'Top Rope':
                        gradeClass = 'five' + s.replace('5.','').replace('+','').replace('-','');
                        if(climbGrades.indexOf(s) > climbGrades.indexOf($scope.stats.bestTopRope))
                            $scope.stats.bestTopRope = s;
                        break;
                    }
                    c.mappedSends.push({ grade: s, gradeClass: gradeClass, sends: [s] });
                } else {
                    res[0].sends.push(s)
                }
            });
            if(c.purpose === 'comp') {
                topSendsForComp = [];
                c.mappedSends.forEach(function(s) {
                    topSendsForComp.push({ grade: s.grade });
                });
                topSendsForComp = topSendsForComp.sort(function(a, b) {
                    return parseInt(a.grade) < parseInt(b.grade);
                });
                topSendsForComp = topSendsForComp.slice(0, 6);
                session.totalPoints = 0;
                var i = 0;
                topSendsForComp.forEach(function(s) {
                    session.totalPoints += parseInt(s.grade);
                    s.grade = '#' + (++i) + ' - ' + s.grade;
                });
            }
            session.sendCount = c.sends.length;
            $scope.stats.routesClimbed += session.sendCount;
        });
        if(topSendsForComp.length > 0) {
            session.climbs.push({
                type: 'Top Sends',
                mappedSends: topSendsForComp
            });
        }
        session.climbs.sort(function(a, b) { 
            return a.type > b.type;
        });
        return session;
    }

});
