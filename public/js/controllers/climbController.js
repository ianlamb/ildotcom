angular.module('climbController', []).controller('ClimbController', function($scope, $http) {

    var token = window.localStorage.getItem('token');
    if (token) {
        $scope.authorized = true;
        $.ajaxSetup({
            headers: {
                'x-access-token': token
            }
        });
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

    // TODO: move to service
    $http.get('/api/climbs')
        .success(function(data) {
            var stats = {
                daysClimbed: 0,
                routesClimbed: 0,
                bestBoulder: boulderGrades[0],
                bestLead: climbGrades[0],
                bestTopRope: climbGrades[0]
            };
            var climbSessions = data;
            var chartData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(151,187,205,0.2)",
                        strokeColor: "rgba(151,187,205,1)",
                        pointColor: "rgba(151,187,205,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            };

            climbSessions.forEach(function(session) {
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
                                    if(boulderGrades.indexOf(s) > boulderGrades.indexOf(stats.bestLead))
                                        stats.bestBoulder = s;
                                }
                                break;
                            case 'Lead':
                                gradeClass = 'five' + s.replace('5.','').replace('+','').replace('-','');
                                if(climbGrades.indexOf(s) > climbGrades.indexOf(stats.bestLead))
                                    stats.bestLead = s;
                                break;
                            case 'Top Rope':
                                gradeClass = 'five' + s.replace('5.','').replace('+','').replace('-','');
                                if(climbGrades.indexOf(s) > climbGrades.indexOf(stats.bestTopRope))
                                    stats.bestTopRope = s;
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
                    stats.routesClimbed += session.sendCount;
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
            });
            stats.daysClimbed = climbSessions.length;

            $('#daysClimbed').animateNumber({ number: stats.daysClimbed }, 1000);
            $('#routesClimbed').animateNumber({ number: stats.routesClimbed }, 1000);
            $('#bestBoulder .prefix').html('V');
            $('#bestBoulder .number').animateNumber({ number: stats.bestBoulder.replace('V','') }, 1000);
            $('#bestLead .prefix').html('5.');
            if(stats.bestLead.indexOf('-') > -1)
                $('#bestLead .suffix').hide().html('-').delay(1100).fadeIn(500);
            if(stats.bestLead.indexOf('+') > -1)
                $('#bestLead .suffix').hide().html('+').delay(1100).fadeIn(500);
            $('#bestLead .number').animateNumber({ number: stats.bestLead.replace('5.','').replace('+','').replace('-','') }, 1000);
            $('#bestTopRope .prefix').html('5.');
            if(stats.bestTopRope.indexOf('-') > -1)
                $('#bestTopRope .suffix').hide().html('-').delay(1100).fadeIn(500);
            if(stats.bestTopRope.indexOf('+') > -1)
                $('#bestTopRope .suffix').hide().html('+').delay(1100).fadeIn(500);
            $('#bestTopRope .number').animateNumber({ number: stats.bestTopRope.replace('5.','').replace('+','').replace('-','') }, 1000);

            // var ctx = document.getElementById('climbingChart').getContext('2d');
            // var chart = new Chart(ctx).Line(chartData);

            stats.lastClimb = moment(climbSessions[0].date).fromNow();

            $scope.climbSessions = climbSessions;
            $scope.stats = stats;
        })
        .error(function(err) {
            console.error(err);
        });

});
