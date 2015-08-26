(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('CardCtrl', function($http, $rootScope, $scope, $mdDialog, $cookies, cart, ngCart, Auth) {

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
            $scope.addToCart = function() {
                ngCart.addItem($scope.item.id, $scope.item.name, parseFloat($scope.item.price), 1, $scope.item);
            };

            // CARD MENU
            $scope.openMenu = function($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdnMenu(ev);
            };

            // ADD TO FAV
            $scope.postFav = function(productid) {
                var data = {
                    userid: $rootScope.userData.uid,
                    productid: productid
                };
                $http.post('api/accounts/postuserfav.php', data)
                    .then(function(response) {
                        $scope.item.favourite = !$scope.item.favourite;
                    }).catch(function(error) {
                        console.log(error);
                    });
            }
        });

})();