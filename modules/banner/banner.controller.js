'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:BannersCtrl
 * @description
 * # BannersCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('BannersCtrl', function($scope, $interval) {
        $scope.banners = [
            "/uploads/banners/adidas_banner.jpg",
            "/uploads/banners/adidas2_banner.jpg",
            "/uploads/banners/puma_banner.jpg",
            "/uploads/banners/puma2_banner.jpg",
            "/uploads/banners/teho_banner.jpg"
        ];
        $scope.start = 0;

        var countInt;
        $scope.count = function() {
            if (angular.isDefined(countInt)) return;
            countInt = $interval(function() {
                $scope.start++;
                $scope.start = $scope.start % $scope.banners.length;
                console.log($scope.start % $scope.banners.length);
            }, 1000);
        };

        $scope.$on('$destroy', function() {
            // Make sure that the interval is destroyed too
            $interval.cancel(countInt);
        });

        // $scope.count();
    });
