(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('MainCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
            $scope.slides = [
                "/uploads/slider/slide_adidas.jpg",
                "/uploads/slider/slide_nike.jpg",
                "/uploads/slider/slide_puma.jpg"
            ];
            $scope.sliderLength = $scope.slides.length;
        }]);

})();