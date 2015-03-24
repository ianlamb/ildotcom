angular.module('wowController', []).controller('WowController', function($scope, WowProfile) {

    $scope.wowProfile = {};

    WowProfile.get()
        .success(function(data) {
            $scope.wowProfile = data;
        });

    $scope.percent = function(partial, total) {
        var retval = parseInt(partial / total * 100);
        return isNaN(retval) ? 0 : retval;
    };

    $scope.formatProgress = function(partial, total) {
        return (partial ? partial : 0) + ' / ' + (total ? total : 0) + ' (' + $scope.percent(partial, total) + '%)';
    };

    $scope.itemQuality = function(quality) {
        switch(quality) {
            case 0:
                return 'trash';
            case 1:
                return 'common';
            case 2:
                return 'uncommon';
            case 3:
                return 'rare';
            case 4:
                return 'epic';
            case 5:
                return 'legendary';
        }
    };

    $scope.parseFeedItem = function(feedItem) {
        switch(feedItem.type) {
            case "CRITERIA":
                return 'Completed step of achievement "' + feedItem.achievement.title + '"';
            case "ACHIEVEMENT":
                return 'Earned the achievement "' + feedItem.achievement.title + '"';
            case "BOSSKILL":
                return feedItem.achievement.title;
            case "LOOT":
                return 'Looted Item ' + feedItem.itemId;
        }
    };

    $scope.fromNow = function(timestamp) {
        return moment(timestamp).fromNow();
    };

});
