(function() {
    'use strict';

    angular
        .module('gdCart')
        .factory('gdShoppingLists', function($rootScope, $q, $filter, gdShoppingCart) {
            var obj = {};


            // ----------------------------
            // LISTS ARRAY
            // ----------------------------

            obj.lists = {};

            // ADD NEW LIST
            obj.newList = function() {
                // define the initial state of the list to be added
                var date = new Date(),
                    year = $filter('date')(date, 'yy'),
                    month = $filter('date')(date, 'MM'),
                    day = $filter('date')(date, 'dd'),
                    idPrefix = '' + year + month + day + '',
                    list = {
                        id: $filter('serialize')(idPrefix),
                        added: new Date(),
                        shipping: null,
                        taxRate: null,
                        discount: null,
                        active: true,
                        inCart: false,
                        items: [],
                        sendToCart: function() {
                            this.inCart = true;
                            var items = angular.copy(this.items);
                            var deferred = $q.defer();
                            var promise = deferred.promise;
                            promise.then(function() {
                                angular.forEach(items, function(item) {
                                    if (gdShoppingCart.products.indexOf(item.product.code) > -1) {
                                        var existingItem = $filter('filter')(gdShoppingCart.items, function(d) {
                                            return d.product.code === item.product.code;
                                        })[0];
                                        existingItem.count = existingItem.count + item.count;
                                    } else {
                                        gdShoppingCart.products.push(item.product.code);
                                        gdShoppingCart.items.push(item);
                                        $rootScope.$broadcast('gdShoppingCart: item-added', {});
                                    }
                                });
                            }).then(function() {
                                $rootScope.$broadcast('gdShoppingCart: cart-changed', {});
                                console.log("cart changed");
                            });
                            deferred.resolve();
                        },
                        removeFromCart: function() {
                            this.inCart = false;
                            var items = this.items;
                            var deferred = $q.defer();
                            var promise = deferred.promise;
                            promise.then(function() {
                                angular.forEach(items, function(item) {
                                    var existingItem = $filter('filter')(gdShoppingCart.items, function(d) {
                                        return d.product.code === item.product.code;
                                    })[0];
                                    existingItem.count = existingItem.count - item.count;
                                    if(existingItem.count <= 0){
                                        var iIdx = gdShoppingCart.items.indexOf(existingItem);
                                        var pIdx = gdShoppingCart.products.indexOf(existingItem.product.code);
                                        gdShoppingCart.items.splice(iIdx, 1);
                                        gdShoppingCart.products.splice(pIdx, 1);
                                    }
                                });
                            }).then(function() {
                                $rootScope.$broadcast('gdShoppingCart: cart-changed', {});
                                console.log("cart changed");
                            });
                            deferred.resolve();
                        },
                        count: function() {
                            var sum = 0;
                            angular.forEach(this.items, function(item) {
                                var count = parseFloat(item.count);
                                sum = sum + (count);
                            });
                            return sum;
                        },
                        total: function() {
                            var sum = 0;
                            angular.forEach(this.items, function(item) {
                                var count = parseFloat(item.count);
                                sum = sum + (count * item.product.price);
                            });
                            return sum;
                        }
                    };
                // make all the other lists inactive
                // so when this list gets pushed it becomes the active one
                angular.forEach(obj.lists, function(list) {
                    list.active = false;
                });

                // push the list
                obj.lists[list.id] = angular.copy(list);

                // broadcast the creation of the new list
                $rootScope.$broadcast('gdShoppingLists: list-added', list);
            };

            // ------------------------
            // FUNCTIONS
            // ------------------------

            // GET THE ACTIVE LIST
            obj.activeList = function() {
                var active = {};
                angular.forEach(obj.lists, function(list) {
                    if (list.active) {
                        active = list;
                    }
                });
                return active;
            };

            // MAKE LIST ACTIVE BY ID
            obj.makeActive = function(id) {
                angular.forEach(obj.lists, function(list) {
                    if (list.id == id) {
                        list.active = true;
                    } else {
                        list.active = false;
                    }
                });
            };

            // -------------------------
            // ITEMS
            // -------------------------

            // ADD AN ITEM BASED ON 5 ARGUMENTS
            // 1. the list to add the item to
            // 2. the product
            // 3. the selected size for the product
            // 4. the order count
            // 5. some optional data
            // -----------------------------------
            obj.addItem = function(list, product, size, count, data) {
                var inList = obj.getItemByCode(product.code, list);

                if (angular.isObject(inList)) {
                    //Update quantity of an item if it's already in the list
                    inList.setCount(count, false);
                    $rootScope.$broadcast('gdShoppingLists: item-changed', {
                        "list": list,
                        "item": item
                    });
                    if(list.inCart){
                        var existingItem = $filter('filter')(gdShoppingCart.items, function(d) {
                            return d.product.code === product.code;
                        })[0];
                        existingItem.count = existingItem.count + count;
                    }
                } else {
                    var item = {};
                    item.product = angular.copy(product);
                    item.size = size;
                    item.count = parseFloat(count);
                    item.data = angular.copy(data);

                    item.setCount = function(count, newCount) {
                        if (!newCount) {
                            item.count = item.count + parseFloat(count);
                        } else {
                            item.count = parseFloat(count);
                        }
                    }

                    list.items.push(item);
                    if (list.inCart) {
                        gdShoppingCart.items.push(item);
                    }
                    $rootScope.$broadcast('gdShoppingCart: item-added', {});
                    $rootScope.$broadcast('gdShoppingCart: cart-changed', {});
                    $rootScope.$broadcast('gdShoppingLists: item-added', {
                        "list": list,
                        "item": item
                    });
                    $rootScope.$broadcast('gdShoppingLists: item-changed', {
                        "list": list,
                        "item": item
                    });
                }



            };

            obj.getItemByCode = function(code, list) {
                var items = list.items;
                var item = false;

                angular.forEach(items, function(d) {
                    if (d.product.code === code) {
                        item = d;
                    }
                });
                return item;
            };


            // REMOVE AN ITEM BY PRODUCT.CODE FROM THE SPECIFIED LIST

            obj.removeItem = function(list, code) {
                console.log("removing item " + code + "");
            };

            // ---------------------------
            // SEND TO CART
            // ---------------------------

            obj.sendToCart = function(lists, items) {}

            return obj;
        });

})();