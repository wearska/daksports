(function() {
  'use strict';

  angular.module('daksportsApp')
    .controller('CartCtrl', function($rootScope, $scope, nav, cart, ngCart) {

      // ngCart.setTaxRate(7.5);
      $scope.getShipping = function() {
        (ngCart.totalCost() > 100) ? ngCart.setShipping(0): ngCart.setShipping(20.00);
      }
      $scope.getShipping();
      $scope.$on('ngCart:change', function(event, data) {
        $scope.getShipping();
      });
      $scope.sayThis = function() {
        console.log("data");
      };

      console.log(cart.cartItems);
      $scope.cartItems = cart.cartItems;
      $scope.emptyCart = function() {
        ngCart.empty();
      }

      var setQtySelect = function(item) {
        for (var i = 0; i < item.inv; i++) {
          item.qtySelect.push(i + 1);
        }
      }

      angular.forEach(ngCart.getItems(), function(value, key) {
        value._data.qtySelect = [];
        value._data.orderQty = value._quantity;
        setQtySelect(value._data);
      });

      $scope.$on('ngCart:itemAdded', function(event, item) {
        item._data.qtySelect = [];
        item._data.orderQty = item._quantity;
        setQtySelect(item._data);
      });
    });

})();