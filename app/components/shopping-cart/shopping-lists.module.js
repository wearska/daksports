(function() {
    'use strict';

    angular
        .module('gdCart', [])
        .run(['$rootScope', 'gdShoppingLists', function($rootScope, gdShoppingLists) {
            gdShoppingLists.newList();
            var firstList = gdShoppingLists.activeList();
            firstList.sendToCart();            
        }])

})();
