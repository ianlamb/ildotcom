angular.module('app.utilities', [])
    .factory('Utilities', function() {
        'use strict';

        var utilities = {};

        utilities.slugify = function(text) {
            return text.toString().trim().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-');        // Replace multiple - with single -
        };

        utilities.stripHtmlTags = function(html) {
            var div = document.createElement("div");
            div.innerHTML = html;
            return div.textContent || div.innerText || "";
        };

        utilities.capitaliseFirstLetter = function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        };

        utilities.formatSlug = function(slug) {
            var parts = slug.split('-');
            for (var i = 0; i < parts.length; i++) {
                parts[i] = utilities.capitaliseFirstLetter(parts[i]);
            }
            return parts.join(' ');
        };
        
        // month is 1 based
        utilities.daysInMonth = function(month, year) {
            return new Date(year, month, 0).getDate();
        };
        
        utilities.scrollTo = function(element, to, duration) {
            if (!element || !to) {
                console.warn('tried to scroll, but the source or target element was invalid');
                return;
            }
            duration = duration || 500;
            
            var start = element.scrollTop,
                change = to - start,
                currentTime = 0,
                increment = 20;
        
            var animateScroll = function(){
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime, start, change, duration);
                element.scrollTop = val; 
                if(currentTime < duration) {
                    setTimeout(animateScroll, increment);
                }
            };
            animateScroll();
        };
        
        //t = current time
        //b = start value
        //c = change in value
        //d = duration
        Math.easeInOutQuad = function (t, b, c, d) {
            t /= d/2;
            if (t < 1) {
                return c/2*t*t + b;
            }
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };
        
        return utilities;

    });