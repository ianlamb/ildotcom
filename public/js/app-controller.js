angular.module('ildotcomApp')
    .controller('ildotcomCtrl',
        function($scope, $rootScope, $window, $location, $state, $http, $timeout, Utilities, Posts) {
        'use strict';
    
        $rootScope.moment = moment;
        
        $scope.logout = function() {
            $location.path('/logout').replace();
        };
    
        // check for auth token
        var token = window.localStorage.getItem('token');
        if (token) {
            var decoded = jwt_decode(token);
            var now = new Date().getTime();
            var diff = decoded.exp - now;
            if (diff < 0) {
                $scope.logout();
            } else {
                $http.defaults.headers.common['x-access-token'] = token;
                $timeout($scope.logout, diff);
                $rootScope.authorized = true;
            }
        }
    
        // direct to default sub modules
        $rootScope.$on('$stateChangeStart', function(e, toState) {
            if (toState.name === 'blog') { 
                e.preventDefault();
                $state.go('blog.roll');
            }
            if (toState.name === 'adventure') { 
                e.preventDefault();
                $state.go('adventure.travel');
            }
            if (toState.name === 'gaming') { 
                e.preventDefault();
                $state.go('gaming.wow');
            }
        });
    
        // scroll to the top of the window to make page changes feel natural
        $rootScope.$on('$stateChangeSuccess', function() {
            $window.scrollTo(0,0);
        });
    
        $scope.$on('$viewContentLoaded', function() {
            $window.ga('send', 'pageview', { page: $location.url() });
            $(".navbar-collapse.collapse.in").collapse('hide');
        });
    
        $scope.trackClickEvent = function(label) {
            ga('send', 'event', 'button', 'click', label);
        };
        
        // handle resume pdf conversion
        $scope.downloadResume = function() {
            ga('send', 'event', 'button', 'click', 'download-resume');
    
            var doc = new jsPDF();
            doc.setProperties({
                title: 'Resume - Ian Lamb',
                author: 'Ian Lamb'
            });
            
            var fontSize = 12;
            var leftOffset = 15;
            var lineHeight = 6;
            var maxLineWidth = 180;
            var cursor = 10;
            
            doc.setFontSize(fontSize);
            
            doc.text($('#name').text(), leftOffset, cursor+=lineHeight);
            // doc.text($('#address1').text() + ', ' + $('#address2').text(), leftOffset, cursor+=lineHeight);
            // doc.text($('#phone').text() + ' | ' + $('#email').text() + ' | ' + $('#website').text(), leftOffset, cursor+=lineHeight);
            doc.text($('#address1').text(), leftOffset, cursor+=lineHeight);
            doc.text($('#address2').text(), leftOffset, cursor+=lineHeight);
            doc.text($('#phone').text(), leftOffset, cursor+=lineHeight);
            doc.text($('#email').text(), leftOffset, cursor+=lineHeight);
            doc.text($('#website').text(), leftOffset, cursor+=lineHeight);
            doc.text('', leftOffset, cursor+=lineHeight);
            
            doc.text('// OBJECTIVE', leftOffset, cursor+=lineHeight);
            var lines = doc.splitTextToSize($('#objective').text().trim(), maxLineWidth);
            lines.forEach(function(line) {
                doc.text(line, leftOffset, cursor+=lineHeight);
            });
            doc.text('', leftOffset, cursor+=lineHeight);
            
            doc.text('// SKILLS', leftOffset, cursor+=lineHeight);
            $('#skills section').each(function() {
                var text = $(this).find('.category').text();
                $(this).find('li').each(function() {
                    text += ' | ' + $(this).text();
                });
                doc.text(text, leftOffset, cursor+=lineHeight);
            });
            doc.text('', leftOffset, cursor+=lineHeight);
    
            doc.text('// EXPERIENCE', leftOffset, cursor+=lineHeight);
            $('#experience section').each(function() {
                var text = $(this).find('.workplace .title').text() + ' - ';
                text += $(this).find('.location').text();
                text += ' (' + $(this).find('.timestamp').text() + ')';
                doc.text(text, leftOffset, cursor+=lineHeight);
                doc.text($(this).find('.position').text().replace('&amp;', '&'), leftOffset, cursor+=lineHeight);
                $(this).find('li').each(function() {
                    lines = doc.splitTextToSize('-   ' + $(this).text(), maxLineWidth);
                    lines.forEach(function(line, i) {
                        doc.text(i > 0 ? '    ' + line : line, leftOffset, cursor+=lineHeight);
                    });
                });
                doc.text('', leftOffset, cursor+=lineHeight);
                if ($(this).find('.workplace .title').text() === 'GoodLife Fitness') {
                    doc.addPage();
                    cursor = 10;
                }
            });
            
            doc.text('// EDUCATION', leftOffset, cursor+=lineHeight);
            $('#education section').each(function() {
                var text = $(this).find('.workplace .title').text() + ' - ';
                text += $(this).find('.location').text();
                text += ' (' + $(this).find('.timestamp').text() + ')';
                doc.text(text, leftOffset, cursor+=lineHeight);
                doc.text($(this).find('.certificate').text(), leftOffset, cursor+=lineHeight);
                var extra = $(this).find('.extra').text();
                if (extra.length > 0) {
                    doc.text(extra, leftOffset, cursor+=lineHeight);
                }
                doc.text('', leftOffset, cursor+=lineHeight);
            });
            
            doc.text('// REFERENCES AVAILABLE UPON REQUEST', leftOffset, cursor+=lineHeight);
            
            doc.save('Resume-IanLamb.pdf');
        };
    
    });
