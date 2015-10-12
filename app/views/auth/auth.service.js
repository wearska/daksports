(function() {
    'use strict';

    angular.module('daksportsApp')
        .factory('Auth', ['$rootScope', '$http', '$filter', '$firebaseAuth', 'FIREBASE_URL', '$location', 'productRes', 'reviews', function($rootScope, $http, $filter, $firebaseAuth, FIREBASE_URL, $location, productRes, reviews) {
                var ref = new Firebase(FIREBASE_URL);
                var authObj = $firebaseAuth(ref);

                function setFavourite(code) {
                    var product = $filter('filter')($rootScope.products, function(d) {
                        return d.code === code;
                    })[0];
                    product.favourite = true;
                };

                // CHECK AUTH

                authObj.$onAuth(function(authData) {
                    if (authData) {
                        // get user stored data
                        $http.get('api/accounts/get.php?uid=' + authData.uid)
                            .then(function(response) {
                                $rootScope.userData = response.data[0];
                                ($rootScope.userData.birthday === '0000-00-00') ? $rootScope.userData.birthday = "": $rootScope.userData.birthday = new Date($rootScope.userData.birthday);
                                ($rootScope.userData.shoe_size) ? $rootScope.userData.shoe_size = parseFloat($rootScope.userData.shoe_size): $rootScope.userData.shoe_size = "";
                                $rootScope.userData.addresses = angular.fromJson($rootScope.userData.addresses);
                                $rootScope.userData.subscriptions = angular.fromJson($rootScope.userData.subscriptions);
                                $http.get('api/accounts/getuserfav.php?uid=' + authData.uid)
                                    .then(function(response) {
                                        $rootScope.userData.favs = response.data;
                                        productRes.query()
                                            .then(function(items) {
                                                $rootScope.products = items;
                                                angular.forEach($rootScope.userData.favs, function(value, key) {
                                                    setFavourite(value);
                                                });
                                                reviews.query();
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
                        .then(function(items) {
                            $rootScope.products = items;
                            $rootScope.$broadcast('products:filled', {});
                            reviews.query();
                        }).catch(function(error) {
                            return error;
                        });
                    }
                });
                return authObj;
            }
        ]);

})();
