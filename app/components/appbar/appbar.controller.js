'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AppBarCtrl
 * @description
 * # AppBarCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AppBarCtrl', function($rootScope, $scope, $location, $timeout, nav, ngCart) {

        // TOGGLE SEARCH BAR
        $scope.showSearchBar = false;
        $scope.toggleSearchBar = function() {
            $scope.showSearchBar = !$scope.showSearchBar;
        };
        $scope.hideSearchBar = function() {
            $scope.showSearchBar = false;
        };

        // TOGGLE NAV
        $scope.navOpen = false;
        $scope.toggleNav = function() {
            nav.toggleNav();
        }
        $scope.$watch(function() {
                return nav;
            },
            function(newVal, oldVal) {
                $scope.navOpen = nav.navOpen;
            }, true);

        // CAR ITEMS

        $scope.cartItemsCount = ngCart.getTotalItems() + "";
        $scope.$on('ngCart:change', function(event, data) {
            $scope.cartItemsCount = ngCart.getTotalItems() + "";
            console.log(event);
            console.log(ngCart.isEmpty());
        });


    });
