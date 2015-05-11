angular.module('travelController', []).controller('TravelController', function($scope, Trips) {

    Trips.get()
        .success(function(data) {
            $scope.trips = data;
            $scope.continentsVisited = 1; // TODO: un-hardcode
            $scope.countriesVisited = 0;
            $scope.citiesVisited = 0;
            var countryData = {};
            var geoData = [];
        
            $scope.trips.forEach(function(trip) {
                trip.places.forEach(function(place) {
                    var geoObject = {
                        latLng: [place.lat, place.lng],
                        name: place.city + ', ' + place.countryCode
                    };
                    geoData.push(geoObject);
                    if(!countryData[place.countryCode]) {
                        countryData[place.countryCode] = 10;
                        $scope.countriesVisited++;
                    }
                });
            });
            $scope.citiesVisited = geoData.length;

            $('#map').vectorMap({
                map: 'world_mill_en',
                backgroundColor: 'transparent',
                zoomOnScroll: false,
                regionStyle: {
                    initial: {
                        fill: '#ccc',
                        'fill-opacity': 0.7
                    },
                    hover: {
                        'fill-opacity': 1
                    }
                },
                markerStyle: {
                    initial: {
                        fill: '#DA45F7',
                        'fill-opacity': 1,
                        'stroke-fill': '#DA45F7',
                        'stroke-width': 2,
                        'stroke-opacity': 0.5,
                        r: 3
                    },
                    hover: {
                        'stroke-fill': '#DA45F7',
                        'stroke-width': 6,
                        'stroke-opacity': 0.5,
                    }
                },
                series: {
                    regions: [{
                        values: countryData,
                        scale: ['#009CF3']
                    }]
                },
                normalizeFunction: 'polynomial',
                hoverOpacity: 1,
                hoverColor: false,
                markers: geoData
            });
        });
    
    $scope.formatStartEndDates = function(startDate, endDate) {
        return moment(startDate).format("MMM Do YY") + ' - ' + moment(endDate).format("MMM Do YY");
    };

});
