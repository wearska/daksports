(function() {
  'use strict';

  angular.module('daksportsApp')
    .factory('cart', function cartFactory($http, ngCart) {
      var api = 'api/orders/';
      var obj = {};

      // CART ITEMS
      obj.cartItems = [];
      obj.cartItemsCount = ngCart.getTotalItems() + "";

      angular.forEach(ngCart.getItems(), function(value, key) {
        obj.cartItems.push(value);
      });

      return obj;
    });

})();