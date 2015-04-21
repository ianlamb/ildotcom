angular.module('mainController', []).controller('MainController', function($scope, $rootScope, $window, $location, $state, Post) {
    
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

    Post.get()
        .success(function(data) {
            $scope.latestPost = data;
        })
        .error(function(err) {
            console.error(err);
        });
    
    $scope.email = 'ianlamb32@gmail.com';
    $scope.phone = '+1 (519) 902 6533';
    $scope.location = { name: 'London, ON', latLng: [42.9837, -81.2497] };
    $scope.projects = [
        {
            name: 'GoodLife Fitness Sales',
            url: 'http://www.goodlifefitness.com/training-programs/team-training/camps/ontario/london',
            repo: '',
            image: 'glf-sales-opt.png',
            desc: 'Sales engine for selling GoodLife team training contracts online'
        },
        {
            name: 'Store Finder',
            url: 'http://apps.ianlamb.com/storefinder/',
            repo: 'https://github.com/ianlamb/storefinder',
            image: 'store-finder-opt.png',
            desc: 'Component for selecting stores from a large network'
        },
        {
            name: 'Tempus Notes',
            url: 'http://notes.ianlamb.com/',
            repo: 'https://github.com/ianlamb/notes',
            image: 'tempus-notes-opt.png',
            desc: 'A very simple note-taker, great for remembering what you did for daily scrum'
        },
        {
            name: 'Dark Souls Challenge Runs',
            url: 'http://darksouls.ianlamb.com/challenges',
            repo: 'https://github.com/ianlamb/darksouls-challenges',
            image: 'dscrgen-opt.png',
            desc: 'A fun little randomizer for Dark Souls challenge runs'
        },
        {
            name: 'Z-Code',
            url: 'http://zcode.ianlamb.com/',
            repo: 'https://github.com/ianlamb/zcode',
            image: 'zcode-opt.png',
            desc: 'HTML5 game that my buddy and I made in college'
        },
        {
            name: 'Creekside Landscaping',
            url: 'http://www.creeksidelandscaping.ca/',
            repo: '',
            image: 'creekside-landscaping-opt.png',
            desc: 'WordPress redesign for my neighbour\'s landscaping business'
        }
    ];
    
    $scope.downloadResume = function() {
        var doc = new jsPDF();
        doc.setProperties({
            title: 'Resume - Ian Lamb',
            author: 'Ian Lamb'
        });
        
        var fontSize = 12;
        var leftOffset = 15;
        var rightOffset = 150;
        var lineHeight = 6;
        var maxLineWidth = 180;
        var cursor = 10;
        
        doc.setFontSize(fontSize);
        
        // contact info
        doc.text($('#name').html(), leftOffset, cursor+=lineHeight);
        doc.text($('#address1').html(), leftOffset, cursor+=lineHeight);
        doc.text($('#address2').html(), leftOffset, cursor+=lineHeight);
        doc.text($('#phone').html(), leftOffset, cursor+=lineHeight);
        doc.text($('#email').html(), leftOffset, cursor+=lineHeight);
        doc.text($('#website').html(), leftOffset, cursor+=lineHeight);
        doc.text('', leftOffset, cursor+=lineHeight);
        
        // skills
        doc.text('// SKILLS', leftOffset, cursor+=lineHeight);
        $('#skills section').each(function() {
            var text = $(this).find('.category').html();
            $(this).find('li').each(function() {
                text += ' | ' + $(this).html();
            });
            doc.text(text, leftOffset, cursor+=lineHeight);
        });
        doc.text('', leftOffset, cursor+=lineHeight);
        
        doc.text('// EXPERIENCE', leftOffset, cursor+=lineHeight);
        $('#experience section').each(function() {
            var text = $(this).find('.workplace').html() + ' - ';
            text += $(this).find('.location').html();
            text += ' (' + $(this).find('.timestamp').html() + ')';
            doc.text(text, leftOffset, cursor+=lineHeight);
            doc.text($(this).find('.position').html().replace('&amp;', '&'), leftOffset, cursor+=lineHeight);
            $(this).find('li').each(function() {
                var lines = doc.splitTextToSize('-   ' + $(this).html(), maxLineWidth);
                lines.forEach(function(line, i) {
                    doc.text(i > 0 ? '    ' + line : line, leftOffset, cursor+=lineHeight);
                });
            });
            doc.text('', leftOffset, cursor+=lineHeight);
            if ($(this).find('.workplace').html() === 'Igniteck Inc') {
                doc.addPage();
                cursor = 10;
            }
        });
        
        doc.text('// EDUCATION', leftOffset, cursor+=lineHeight);
        $('#education section').each(function() {
            var text = $(this).find('.workplace').html() + ' - ';
            text += $(this).find('.location').html();
            text += ' (' + $(this).find('.timestamp').html() + ')';
            doc.text(text, leftOffset, cursor+=lineHeight);
            doc.text($(this).find('.certificate').html(), leftOffset, cursor+=lineHeight);
            doc.text('', leftOffset, cursor+=lineHeight);
        });
        
        doc.text('// REFERENCES AVAILABLE UPON REQUEST', leftOffset, cursor+=lineHeight);
        
        doc.save('Resume-IanLamb.pdf');
    }

});