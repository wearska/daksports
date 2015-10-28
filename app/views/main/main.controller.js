(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('MainCtrl', function($scope, $rootScope, $http, $filter, $location) {
            
            $scope.typesGridLinks = {
                fitness: {
                    file : 'uploads/typegrid/fitness.jpg',
                    header: 'Fitness',
                    footer: 'Footer',
                    filter: ['Fitness']
                },
                sportswear: {
                    file : 'uploads/typegrid/sportswear.jpg',
                    header: 'Sports wear',
                    footer: 'Footer',
                    filter: ['Tenis']
                },
                football: {
                    file : 'uploads/typegrid/soccer.jpg',
                    header: 'Fotbal',
                    footer: 'Footer',
                    filter: ['Fotbal']
                },
                running: {
                    file : 'uploads/typegrid/running.jpg',
                    header: 'Alergare',
                    footer: 'Footer',
                    filter: ['Alergare']
                },
                hiking: {
                    file : 'uploads/typegrid/hiking.jpg',
                    header: 'Hiking',
                    footer: 'Footer',
                    filter: ['Hiking']
                },
                skiing: {
                    file : 'uploads/typegrid/skiing.jpg',
                    header: 'Ski',
                    footer: 'Footer',
                    filter: ['Skiing']
                },
                training: {
                    file : 'uploads/typegrid/training2.jpg',
                    header: 'Antrenament',
                    footer: 'Footer',
                    filter: ['Training']
                }
            };
            
            $scope.goTo = function(link){
                $location.path(link);
            };
            
            $scope.slides = [
                "/uploads/slider/slide_adidas.jpg",
                "/uploads/slider/slide_nike.jpg",
                "/uploads/slider/slide_puma2.jpg",
                "/uploads/slider/slide_reebok.jpg"
            ];
            $scope.sliderLength = $scope.slides.length;

            // -----------------------------
            // Main Hero
            // ----------------------------

            $rootScope.transparentAppbar = true;
            $rootScope.mainScrolled = false;
            $scope.$on('$destroy', function() {
                // Make sure that the interval is destroyed too
                $rootScope.transparentAppbar = false;
                $rootScope.mainScrolled = true;
            });
            $scope.$on('$viewContentLoaded', function(event) {
                $rootScope.transparentAppbar = true;
                $rootScope.mainScrolled = false;
            });

            $scope.main_hero = 'assets/img/heroes/main_hero.jpg';

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
