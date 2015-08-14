'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:CartCtrl
 * @description
 * # CartCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('CartCtrl', function($scope, auth, nav, cart, ngCart) {

        ngCart.setTaxRate(7.5);
        ngCart.setShipping(2.99);

        this.sayThis = function(){
            console.log("data");
        };

        console.log(cart.cartItems);
        this.cartItems = cart.cartItems;
        this.emptyCart = function() {
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

        // ORDER TOTAL

    });
