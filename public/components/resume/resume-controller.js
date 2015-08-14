angular.module('app.resume', [])
    .controller('ResumeController',
        function($scope) {
        'use strict';
    
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
