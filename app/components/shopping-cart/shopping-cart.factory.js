(function() {
    'use strict';

    angular
        .module('gdCart')
        .factory('gdShoppingCart', function($http, $rootScope, $q, $filter) {
            var obj = {};

            obj.products = [];
            obj.items = [];
            obj.count = function(){
                var sum = 0;
                angular.forEach(this.items, function(item) {
                    var count = parseFloat(item.count);
                    sum = sum + (count);
                });
                return sum;
            };

            
            return obj;
        });

})();