(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('TestCtrl', function($http, $rootScope, $filter, $scope, $state, $timeout, gdShoppingLists, gdShoppingCart) {
            var api = 'api/products/';

            $scope.gdShoppingLists = gdShoppingLists;
            $scope.gdShoppingCart = gdShoppingCart;

            $scope.pushList = function(){
                gdShoppingList.pushToCart();
            };

            $scope.$on('gdShoppingLists: list-added', function(event, args){
                // console.log(gdShoppingLists.lists);
            });

            $scope.$on('gdShoppingLists: item-added', function(event, args){
                // console.log(args);
            });

        });

})();
