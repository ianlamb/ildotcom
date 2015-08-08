angular.module('placesController', [])
    .controller('PlacesController', function($scope, $filter, $stateParams, Places) {
    'use strict';

    Places.getCities()
        .success(function(data) {
            $scope.places = data;
        })
        .error(function(err) {
            console.error(err);
        });
    
    $scope.editing = false;
    $scope.saving = false;
    $scope.place = {};
    
    $scope.editPlace = function(place) {
        $scope.place.city = place.city;
        $scope.place.country = place.country;
        $scope.place.countryCode = place.countryCode;
        $scope.place.lat = place.lat;
        $scope.place.lng = place.lng;
        $scope.editing = true;
    };

    $scope.savePlace = function(event) {
        $scope.saving = true;

        Places.put($scope.place)
            .then(function success(res) {
                var place = JSON.parse(res.data);
                $scope.places.push(place);
                $scope.message = { type: 'success', body: 'Place saved' };
            }, function error(err) {
                $scope.message = { type: 'danger', body: 'Error: ' + err };
            })
            .finally(function () {
                $scope.saving = false;
                $scope.editing = false;
                clearForm();
            });
    };

    $scope.removePlace = function(place) {
        if (confirm('Are you sure you wish to permanently delete this item?')) {
            Places.delete(place)
                .success(function() {
                    for (var i = 0; i < $scope.places.length; i++) {
                        if ($scope.places[i]._id === place._id) {
                            $scope.places.splice(i, 1);
                        }
                    }
                })
                .error(function(err) {
                    alert(err);
                });
        }
    };
    
    $scope.cancelEdit = function() {
        $scope.editing = false;
        clearForm();
    };
    
    function clearForm() {
        $scope.place.city = '';
        $scope.place.country = '';
        $scope.place.countryCode = '';
        $scope.place.lat = '';
        $scope.place.lng = '';
    }

});
