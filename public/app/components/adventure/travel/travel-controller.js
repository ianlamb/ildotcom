angular.module('app.adventure.travel', [])
    .controller('TravelController', function($scope, $modal, Trips) {
        'use strict';

        Trips.get()
            .success(function(data) {
                $scope.trips = data;
                $scope.continentsVisited = 2; // TODO: un-hardcode
                $scope.countriesVisited = 0;
                $scope.citiesVisited = 0;
                $scope.geoData = [];
                var countryData = {};

                $scope.trips.forEach(function(trip) {
                    trip.places.forEach(function(place) {
                        var geoObject = {
                            latitude: place.lat,
                            longitude: place.lng,
                            name: place.city + ', ' + place.countryCode,
                            country: place.countryCode
                        };
                        $scope.geoData.push(geoObject);
                        if(!countryData[place.countryCode]) {
                            countryData[place.countryCode] = 10;
                            $scope.countriesVisited++;
                        }
                    });
                });
                $scope.citiesVisited = $scope.geoData.length;
            });
        
        $scope.formatStartEndDates = function(startDate, endDate) {
            return moment(startDate).format("MMM Do YY") + ' - ' + moment(endDate).format("MMM Do YY");
        };
        
        $scope.editTrip = function(trip) {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'app/components/adventure/travel/_edit-trip-modal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    trip: function () {
                        return trip;
                    }
                }
            });
            
            modalInstance.result.then(function (res) {
                if (!res.hasOwnProperty('_id')) {
                    $scope.message = { type: 'danger', body: 'Error: ' + res };
                } else {
                    $scope.message = { type: 'success', body: 'Trip saved: ' + res.name };
                }
            });

        };
    })
    
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance, Trips, trip) {
        $scope.trip = trip;
        
        $scope.save = function () {
            Trips.put($scope.trip)
                .then(function success(res) {
                    var trip = res.data;
                    $modalInstance.close(trip);
                }, function error(err) {
                    $modalInstance.close(err);
                });
        };
        
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });