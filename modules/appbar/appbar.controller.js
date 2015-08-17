'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AppBarCtrl
 * @description
 * # AppBarCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AppBarCtrl', function($rootScope, $scope, $location, $timeout, nav, ngCart, UserData, Auth) {

        // ACCOUNT
        $scope.userData = {};
        $scope.logged = false;
        Auth.$onAuth(function(authData) {
            if (authData) {
                $scope.userData = UserData.getUserData();
                $scope.logged = true;
            } else {
                $scope.userData = {};
                $scope.logged = false;
            }
        });
        $scope.logout = function(){
            Auth.$unauth();    
        };

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
            console.log(ngCart.isEmpty());
        });


    });