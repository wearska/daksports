'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AppBarCtrl
 * @description
 * # AppBarCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AppBarCtrl', function($rootScope, $scope, $location, $timeout, auth, nav, ngCart) {

        //AUTHENTICATION
        $scope.logged = false;
        $scope.accountLink = '/account/login'
        $scope.account = {};
        $scope.$watch(function() {
                return auth;
            },
            function(newVal, oldVal) {
                $scope.logged = auth.isAuthenticated;
                $scope.account = auth.account;
                $scope.account.admin = auth.account.admin;
            }, true);

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

        // TOGGLE VIEW CART
        $scope.cartOpen = false;
        $scope.toggleCart = function(event) {
            $scope.cartOpen = !($scope.cartOpen);
            event.stopPropagation();
        };
        window.onclick = function(event) {
            if ($scope.cartOpen) {
                $scope.cartOpen = false;
                $scope.$apply();
            }
        };

        // CAR ITEMS
        $scope.cartItems = [];
        $scope.cartItemsCount = ngCart.getTotalItems() + "";

        angular.forEach(ngCart.getItems(), function(value, key) {
            $scope.cartItems.push(value._data);
        });

    });
