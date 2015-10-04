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
            // Clusters
            //------------------------------

            // Basketball
            $scope.basketballItems = [];
            var getBasketballItems = function() {
                $scope.basketballItems = $filter('typeFilter')($rootScope.products, "Baschet");
            }
            if (!$rootScope.products) {
                $scope.$on('products:filled', function() {
                    getBasketballItems();
                });
            } else {
                getBasketballItems();
            }
            
            //Football
            $scope.footballItems = [];
            var getFootballItems = function() {
                $scope.footballItems = $filter('typeFilter')($rootScope.products, "Fotbal");
            }
            if (!$rootScope.products) {
                $scope.$on('products:filled', function() {
                    getFootballItems();
                });
            } else {
                getFootballItems();
            }
            
            //Tennis
            $scope.tennisItems = [];
            var getTennisItems = function() {
                $scope.tennisItems = $filter('typeFilter')($rootScope.products, "Tenis");
            }
            if (!$rootScope.products) {
                $scope.$on('products:filled', function() {
                    getTennisItems();
                });
            } else {
                getTennisItems();
            }


            //------------------------------
            // Carousel filters
            //------------------------------

            var getShoes = function() {
                var shoes = $filter('kindFilter')($rootScope.products, ['Incaltaminte']);
                $scope.shoes = $filter('orderBy')(shoes, 'added', false);
            }
            getShoes();
            $scope.$on('ratings:filled', function() {
                getShoes();
            });

        });

})();