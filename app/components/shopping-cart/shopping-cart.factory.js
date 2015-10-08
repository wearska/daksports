(function() {
    'use strict';

    angular
        .module('gdCart')
        .factory('gdShoppingCart', function($http, $rootScope, $q, $filter) {
            var obj = {};

            obj.products = [];
            obj.items = [];
            obj.lists = [];
            obj.count = function(){
                var sum = 0;
                angular.forEach(this.items, function(item) {
                    var count = parseFloat(item.count);
                    sum = sum + (count);
                });
                return sum;
            };

            obj.getItems = function() {
                obj.items = [];
                angular.forEach(obj.lists, function(list){
                    angular.forEach(list.items, function(item){
                        var iIdx = obj.items.indexOf(item);
                        if(iIdx == -1){
                            obj.items.push(item);
                        }
                    });
                });
            };

            obj.removeItem = function(deadItem) {
                angular.forEach(obj.lists, function(list){
                    angular.forEach(list.items, function(item){
                        var iIdx = list.items.indexOf(deadItem);
                        if(iIdx > -1){
                            list.items.splice(iIdx, 1);
                        }
                    });
                });
            };

            $rootScope.$on('gdShoppingLists: list-changed', function(){
                obj.getItems();
            });
            $rootScope.$on('gdShoppingLists: list-synced', function(){
                obj.getItems();
            });
            $rootScope.$on('gdShoppingLists: list-unsynced', function(){
                obj.getItems();
            });

            obj.getTotal = function(){
                obj.getItems();
                var sum = 0;
                var items = obj.items;
                angular.forEach(items, function(item){
                    var add = parseFloat(parseFloat(item.count) * parseFloat(item.product.new_price));
                    sum = sum + add;
                });
                return sum;
            };


            return obj;
        });

})();
