(function() {
    'use strict';

    angular
        .module('gdCart', [])
        .run(['$rootScope', 'gdShoppingList', function($rootScope, gdShoppingList) {
            gdShoppingList.pushToCart();
        }])

})();
