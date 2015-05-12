angular.module('utilityService', [])
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

        utilities.sluggify = function(text) {
            return text.toLowerCase().split('\'').join('').split(' ').join('-');
        };

        utilities.formatSlug = function(slug) {
            var parts = slug.split('-');
            for(var i = 0; i < parts.length; i++) {
                parts[i] = utilities.capitaliseFirstLetter(parts[i]);
            }
            return parts.join(' ');
        };
        
        return utilities;

    });