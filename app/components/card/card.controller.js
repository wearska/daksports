(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('CardCtrl', function($http, $rootScope, $scope, $mdDialog, $cookies, cart, ngCart, Auth, $mdBottomSheet, gdShoppingLists, gdShoppingCart) {

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

            // UPDATE PRICE
            // ($scope.item.promo_price) ? $scope.promo_price = $scope.promo_price : $scope.promo_price = $scope.price;

            // ADD TO CART
            $scope.gdShoppingLists = gdShoppingLists;
            $scope.addToCart = function(item) {
                $scope.gdShoppingLists.addItem(gdShoppingLists.activeList(), item, '', 1);
            };

            // CARD MENU
            $scope.openMenu = function($mdOpenMenu, ev) {
                originatorEv = ev;
                $mdnMenu(ev);
            };

            // BOTTOM LIST
            $scope.showListBottomSheet = function(ev) {
                console.log(ev);
                $mdBottomSheet.show({
                    parent: ev.currentTarget.offsetParent,
                    templateUrl: 'app/components/card/card.bs.tpl.html',
                    controller: 'ListBottomSheetCtrl',
                    targetEvent: ev
                }).then(function(clickedItem) {
                    $scope.alert = clickedItem.name + ' clicked!';
                });
            }

            // ADD TO FAV
            $scope.postFav = function(code, fav) {
                var data = {
                    userid: $rootScope.userData.uid,
                    code: code
                };
                if (fav) {
                    $http.post('api/accounts/removeuserfav.php', data)
                        .then(function(response) {
                            $scope.item.favourite = false;
                        }).catch(function(error) {
                            console.log(error);
                        });
                } else {
                    $http.post('api/accounts/postuserfav.php', data)
                        .then(function(response) {
                            $scope.item.favourite = true;
                        }).catch(function(error) {
                            console.log(error);
                        });
                }

            }
        })
        .controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
            $scope.items = [{
                name: 'Comanda',
                icon: 'assets/icons/ic_add_shopping_cart_black_24px.svg'
            }, {
                name: 'Favorite',
                icon: 'assets/icons/ic_favorite_border_black_24px.svg'
            }];
            $scope.listItemClick = function($index) {
                var clickedItem = $scope.items[$index];
                $mdBottomSheet.hide(clickedItem);
            };
        });

})();
