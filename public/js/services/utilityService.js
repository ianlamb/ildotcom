angular.module('utilityService', [])
    .factory('Utilities', function() {

        return {
            slugify: function(text) {
                return text.toString().trim().toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with -
                    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
            }
        };

    });