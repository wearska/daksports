'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:CardCtrl
 * @description
 * # CardCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('CardCtrl', function($scope, $mdDialog, $cookies, auth, cart, ngCart) {

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


        $scope.cartItem = {
            'userid': "",
            'item': {}
        }
        $scope.cartItems = [];

        // DUMMY CONTENT
        $scope.availableSizes = [
            'XS',
            'S',
            'M',
            'L',
            'XL',
            'XXl'
        ];
        $scope.selectedCount = 1;

        // SHOW ORDER FAB
        $scope.showOrderFab = false;
        $scope.toggleOrderFab = function() {
            $scope.showOrderFab = !$scope.showOrderFab;
        }
        $scope.expandedOrderFab = false;
        $scope.expandOrderFab = function() {
            $scope.expandedOrderFab = !$scope.expandedOrderFab;
        }

        // ORDER
        $scope.orderUp = false;
        $scope.toggleOrder = function() {
            $scope.orderUp = !$scope.orderUp;
        };

        // ADD TO CART
        $scope.inCart = false;
        $scope.addToCart = function(item) {
            console.log(item);
        }
    });