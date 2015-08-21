angular.module('app.adventure.travel', [])
    .controller('TravelController', function($scope, Trips) {
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
                            name: place.city + ', ' + place.countryCode
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
    
    });
