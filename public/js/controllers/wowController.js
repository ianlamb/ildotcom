angular.module('wowController', []).controller('WowController', function($scope, WowProfile) {

    $scope.wowProfile = {};

    WowProfile.get()
        .success(function(data) {
            $scope.wowProfile = data;
        });

    $scope.percent = function(partial, total) {
        return parseInt(partial / total * 100);
    };

    $scope.formatProgress = function(partial, total) {
        return partial + ' / ' + total + ' (' + $scope.percent(partial, total) + '%)';
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
                return 'legenday';
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
