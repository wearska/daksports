'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:cart
 * @description
 * # cart
 * Factory of the daksportsApp
 */
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
