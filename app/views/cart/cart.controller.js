(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('CartCtrl', function($rootScope, $scope, gdShoppingCart) {

            $scope.cart = gdShoppingCart;

        });

})();
