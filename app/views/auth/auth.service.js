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
                var setTypes = function(){
                    var user = $rootScope.userData;
                    // sets the birthday to a dat or an empty string
                    (user.birthday === '0000-00-00') ? user.birthday = "": user.birthday = new Date(user.birthday);
                    // shoe size must be an integer
                    (user.shoe_size) ? user.shoe_size = parseFloat(user.shoe_size): user.shoe_size = "";
                    // convert to needed arrays
                    (user.addresses) ? user.addresses = angular.fromJson(user.addresses) : user.addresses = [];
                    (user.businesses) ? user.businesses = angular.fromJson(user.businesses) : user.businesses = [];
                    (user.subscriptions) ? user.subscriptions = angular.fromJson(user.subscriptions) : user.subscriptions = {};
                    (user.defaults) ? user.defaults = angular.fromJson(user.defaults) : user.defaults = {};
                    // user.addresses = angular.fromJson(user.addresses);
                    // user.businesses = angular.fromJson(user.businesses);
                    // user.subscriptions = angular.fromJson(user.subscriptions);
                    // user.defaults = angular.fromJson(user.defaults);
                };

                authObj.$onAuth(function(authData) {
                    if (authData) {
                        // get user stored data
                        $http.get('api/accounts/get.php?uid=' + authData.uid)
                            .then(function(response) {
                                $rootScope.userData = response.data[0];
                                setTypes();
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
