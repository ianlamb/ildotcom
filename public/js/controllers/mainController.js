angular.module('mainController', []).controller('MainController', function($scope, $http) {

    var quotes = [
        {
            quote: 'I\'ve got a great ambition to die of exhaustion rather than boredom',
            person: 'Thomas Carlyle', link: 'http://en.wikipedia.org/wiki/Thomas_Carlyle'
        },
        {
            quote: 'The mind is furnished with ideas by experience alone',
            person: 'John Locke', link: 'http://en.wikipedia.org/wiki/John_Locke'
        },
        {
            quote: 'The unexamined life is not worth living',
            person: 'Socrates', link: 'http://en.wikipedia.org/wiki/Socrates'
        },
        {
            quote: 'One cannot step twice in the same river',
            person: 'Heraclitus', link: 'http://en.wikipedia.org/wiki/Heraclitus'
        },
    ];

    // $http.get('/api/ian')
    //     .success(function(ian) {
            $(document).on('mouseover', '#navPortal a', $.debounce(300, function() {
                var backgroundUrl = $(this).data('backdrop');
                if($('.backdrop img').attr('src') != backgroundUrl) {
                    $('.backdrop img')
                        .animate({
                            'opacity': 0.3
                        }, 100);
                    setTimeout(function() {
                        $('.backdrop img').attr('src', backgroundUrl).animate({
                            'opacity': 1
                        }, 100);
                    }, 80)
                }
            }));

            var quotation = randomQuote();
            $('#quotation .quote').html(quotation.quote);
            $('#quotation .person').html(quotation.person).attr('href', quotation.link);

            //$scope.ian = ian;
        // })
        // .error(function(err) {
        //     console.log('Error: ' + err);
        // });

    function randomQuote() {
        if(quotes.length === 0) {
            return '';
        }
        var index = parseInt(Math.random() * quotes.length);
        return quotes[index];
    }

});