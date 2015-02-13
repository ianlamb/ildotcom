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
        switch(feedItem) {
            case "CRITERIA":
                return "Completed step of achievement";
            case "ACHIEVEMENT":
                return "Earned the achievement";
            case "BOSSKILL":
                return "Killed";
            case "LOOT":
                return "Looted"
        }
    };

    $scope.fromNow = function(timestamp) {
        return moment(timestamp).fromNow();
    };

});
