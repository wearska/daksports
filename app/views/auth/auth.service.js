(function() {
    'use strict';

    angular.module('daksportsApp')
        .factory('Auth', ['$rootScope', '$http', '$filter', '$firebaseAuth', 'FIREBASE_URL', '$location', 'productRes',
            function($rootScope, $http, $filter, $firebaseAuth, FIREBASE_URL, $location, productRes) {
                var ref = new Firebase(FIREBASE_URL);
                var authObj = $firebaseAuth(ref);

                function setFavourite(id) {
                    var product = $filter('filter')($rootScope.products, function(d) {
                        return d.id === id;
                    })[0];
                    product.favourite = true;
                };

                function setTypes(item) {
                    item.added = new Date(item.added);
                    item.inv = parseFloat(item.inv);
                    item.price = parseFloat(item.price).toFixed(2);
                    item.promo = parseFloat(item.promo);
                    item.published = parseFloat(item.published);
                    item.promo_price = parseFloat(item.promo_price).toFixed(2);
                    item.promo_stock = parseFloat(item.promo_stock);
                    if (item.promo && item.promo_price) {
                        item.old_price = item.price;
                        item.new_price = item.promo_price;
                    }else{
                        item.old_price = 0;
                        item.new_price = item.price;
                    };
                    (item.tags) ? item.tags = item.tags.split(','): item.tags = [];
                    (item.colours) ? item.colours = item.colours.split(','): item.colours = [];
                    (angular.isDate(item.promo_end)) ? item.promo_end = item.promo_end: item.promo_end = new Date(item.promo_end);
                }

                // CHECK AUTH
                authObj.$onAuth(function(authData) {
                    if (authData) {
                        // get user stored data
                        $http.get('api/accounts/get.php?uid=' + authData.uid)
                            .then(function(response) {
                                $rootScope.userData = response.data[0];
                                $http.get('api/accounts/getuserfav.php?uid=' + authData.uid)
                                    .then(function(response) {
                                        $rootScope.userData.favs = response.data;
                                        productRes.query()
                                            .then(function(response) {
                                                $rootScope.products = response.data;
                                                angular.forEach($rootScope.userData.favs, function(value, key) {
                                                    setFavourite(value);
                                                });
                                                angular.forEach($rootScope.products, function(value, key) {
                                                    setTypes(value);
                                                });
                                                $rootScope.$broadcast('products:filled', {});
                                            }).catch(function(error) {
                                                return error;
                                            });
                                    }).catch(function(error) {
                                        $rootScope.userData = {};
                                        return error;
                                    });
                            }).catch(function(error) {
                                $rootScope.userData = {};
                                return error;
                            });
                        $rootScope.logged = true;
                    } else {
                        $rootScope.userData = {};
                        $rootScope.logged = false;
                        productRes.query()
                            .then(function(response) {
                                $rootScope.products = response.data;
                                angular.forEach($rootScope.products, function(value, key) {
                                    setTypes(value);
                                });
                                $rootScope.$broadcast('products:filled', {});
                            }).catch(function(error) {
                                return error;
                            });
                    }
                });
                return authObj;
            }
        ]);

})();