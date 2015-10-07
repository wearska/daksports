(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('TestCtrl', function($http, $rootScope, $filter, $scope, $state, $timeout, gdShoppingList, gdCart) {
            var api = 'api/products/';

            $scope.gdCart = gdCart;
            $scope.gdShoppingList = gdShoppingList;

            $scope.pushList = function(){
                gdShoppingList.pushToCart();
            };

            $scope.$on('gdCart: list-added', function(event, args){
                console.log(gdCart.lists);
            });

            $scope.$on('gdCart: item-added', function(event, args){
                console.log(gdCart.lists);
            });

        });

})();
