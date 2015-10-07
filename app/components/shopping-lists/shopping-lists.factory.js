(function() {
    'use strict';

    angular
        .module('gdCart')
        .factory('gdCart', function($http, $rootScope, $q, $filter) {
            var obj = {};

            obj.lists = [];

            obj.activeList = function() {
                var active = {};
                angular.forEach(obj.lists, function(list) {
                    if (list.active) {
                        active = list;
                    }
                });
                return active;
            };

            obj.addItem = function(list, product, size, count, data){
                var item = {};
                item.product = angular.copy(product);
                item.size = size;
                item.count = parseFloat(count);
                item.data = angular.copy(data);
                list.items.push(item);
                $rootScope.$broadcast('gdCart: item-added', {list, item});
            };

            obj.removeItem = function(list, code){
                console.log("removing item " + code + "");
            };

            obj.total = function(listId){
                var sum = 0;
                var list = $filter('filter')(obj.lists, function(d) {
                    // console.log(d.id);
                    return d.id === listId;
                })[0];
                // console.log(list.items);
                angular.forEach(list.items, function(item){
                    var count = parseFloat(item.count);
                    sum = sum + (count * item.product.price);
                });
                return sum;
            }

            return obj;
        });

})();
