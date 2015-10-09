(function() {
    'use strict';

    angular
        .module('gdCart')
        .factory('gdShoppingLists', function($rootScope, $http, $q, $filter, Auth, gdShoppingCart) {
            var obj = {};
            var api = 'api/shopping-lists/';
            var restoring = false;

            // ----------------------------
            // GET USER LISTS
            // ----------------------------
            obj.query = function(userid) {
                return $http.get(api + 'query.php?uid=' + userid)
                    .then(function(response) {
                        var lists = response.data;
                        return lists;
                    });
            };

            obj.post = function(list) {
                var data = {};
                data.userid = Auth.$getAuth().uid;
                data.listid = parseFloat(list.id);
                data.listname = "";
                data.added = list.added;
                data.list = list;
                if (Auth.$getAuth()) {
                    return $http.post(api + 'post.php', data).then(function(results) {
                        return results;
                    });
                }
            };

            obj.put = function(list) {
                console.log("updating list " + list.id + "");
                var data = {};
                data.userid = Auth.$getAuth().uid;
                data.listid = parseFloat(list.id);
                data.listname = "";
                data.added = list.added;
                data.list = list;
                if (Auth.$getAuth()) {
                    return $http.post(api + 'put.php', data).then(function(results) {
                        return results;
                    });
                };
            };

            $rootScope.$on('gdCart: changed', function() {
                angular.forEach(obj.lists, function(list) {
                    list.update();
                });
            });
            $rootScope.$on('gdCart: emptied', function() {
                angular.forEach(obj.lists, function(list) {
                    list.unSyncToCart(false);
                    list.update();
                });
            });

            $rootScope.$on('gdShoppingLists: item-changed', function() {
                if (!restoring) {
                    console.log("item changed");
                    angular.forEach(obj.lists, function(list) {
                        list.update();
                    });
                }
            });


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
                        active: true,
                        inCart: false,
                        items: [],
                        syncToCart: function(event) {
                            this.inCart = true;
                            gdShoppingCart.lists.push(this);
                            $rootScope.$broadcast('gdShoppingLists: list-synced', {});
                            event.stopPropagation();
                        },
                        unSyncToCart: function(broadcast, event) {
                            this.inCart = false;
                            var idx = gdShoppingCart.lists.indexOf(this);
                            gdShoppingCart.lists.splice(idx, 1);
                            if (broadcast) {
                                $rootScope.$broadcast('gdShoppingLists: list-unsynced', {});
                            }
                            event.stopPropagation();
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
                        },
                        update: function() {
                            obj.put(this);
                            console.log("updating list");
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
                obj.post(obj.lists[list.id]);
            };
            obj.restoreList = function(data) {
                restoring = true;
                var baseItems = angular.copy(data.items);
                var list = {
                    id: data.id,
                    added: data.added,
                    active: data.active,
                    inCart: data.inCart,
                    items: [],
                    syncToCart: function() {
                        this.inCart = true;
                        gdShoppingCart.lists.push(this);
                        $rootScope.$broadcast('gdShoppingLists: list-synced', {});
                    },
                    unSyncToCart: function(broadcast) {
                        this.inCart = false;
                        var idx = gdShoppingCart.lists.indexOf(this);
                        gdShoppingCart.lists.splice(idx, 1);
                        if (broadcast) {
                            $rootScope.$broadcast('gdShoppingLists: list-unsynced', {});
                        }
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
                    },
                    update: function() {
                        obj.put(list);
                        console.log("updating list");
                    }
                };
                var deferred = $q.defer();
                var promise = deferred.promise;
                promise.then(function() {
                    angular.forEach(baseItems, function(item) {
                        obj.addItem(list, angular.copy(item.product), item.size, item.count, angular.copy(item.data));
                        console.log('adding item');
                    });
                }).then(function() {
                    restoring = false;
                    // push the list
                    obj.lists[list.id] = list;

                    if (list.inCart) {
                        list.syncToCart();
                    };

                    // broadcast the creation of the new list
                    $rootScope.$broadcast('gdShoppingLists: list-added', list);
                });
                deferred.resolve();

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
                var inList = obj.getListItem(product.code, size, list);

                if (angular.isObject(inList)) {
                    //Update quantity of an item if it's already in the list
                    inList.setCount(count, false);
                    $rootScope.$broadcast('gdShoppingLists: item-changed', {
                        list
                    });
                } else {
                    var item = {};
                    item.product = angular.copy(product);
                    item.size = size;
                    item.count = parseFloat(count);
                    item.data = angular.copy(data);

                    item.setCount = function(count, newCount) {
                        console.log("adding count");
                        if (!newCount) {
                            this.count = this.count + parseFloat(count);
                        } else {
                            this.count = parseFloat(count);
                        }
                    }

                    list.items.push(item);

                    $rootScope.$broadcast('gdShoppingCart: item-added', {});
                    $rootScope.$broadcast('gdShoppingCart: cart-changed', {});
                    $rootScope.$broadcast('gdShoppingLists: item-added', {});
                    $rootScope.$broadcast('gdShoppingLists: item-changed', {
                        list
                    });
                }
                $rootScope.$broadcast('gdShoppingLists: list-changed', {});
            };

            obj.getListItem = function(code, size, list) {
                var items = list.items;
                var item = false;

                angular.forEach(items, function(d) {
                    if (d.product.code === code && d.size == size) {
                        item = d;
                    }
                });
                return item;
            };

            obj.getCartItemByCode = function(code) {
                var items = gdShoppingCart.items;
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
                $rootScope.$broadcast('gdShoppingLists: list-changed', {});
            };

            // ---------------------------
            // SEND TO CART
            // ---------------------------

            obj.sendToCart = function(lists, items) {}

            return obj;
        });

})();
