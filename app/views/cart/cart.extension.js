'use strict';
angular.module('daksportsApp')
    .directive('gdCart', function(ngcartCartDirective) {
        return angular.extend({}, ngcartCartDirective[0], {
            templateUrl: '/app/views/cart/cart.cart.tpl.html'
        });
    })
    .directive('gdAddtocart', function(ngcartAddtocartDirective) {
        return angular.extend({}, ngcartAddtocartDirective[0], {
            templateUrl: function(element, attrs) {
                if ( typeof attrs.templateUrl == 'undefined' ) {
                    return '/app/views/cart/cart.addtocart.tpl.html';
                } else {
                    return attrs.templateUrl;
                }
            }
        });
    });