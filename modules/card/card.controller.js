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
        $scope.toggleOrderFab = function(){
            $scope.showOrderFab = !$scope.showOrderFab;
        }
        $scope.expandedOrderFab = false;
        $scope.expandOrderFab = function(){
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
