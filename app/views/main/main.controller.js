(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('MainCtrl', function($scope, $rootScope, $http, $filter, $location) {
            $scope.slides = [
                "/uploads/slider/slide_adidas.jpg",
                "/uploads/slider/slide_nike.jpg",
                "/uploads/slider/slide_puma.jpg",
                "/uploads/slider/slide_reebok.jpg"
            ];
            $scope.sliderLength = $scope.slides.length;
            
            //------------------------------
            // Carousel filters
            //------------------------------
            
            var getShoes = function(){
                var shoes = $filter('kindFilter')($rootScope.products, ['Incaltaminte']);
                $scope.shoes = $filter('orderBy')(shoes, 'added', false);
            }
            getShoes();
            $scope.$on('ratings:filled', function(){
                getShoes();
            });
            
        });

})();
