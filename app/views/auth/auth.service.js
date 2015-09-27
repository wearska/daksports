(function() {
    'use strict';

    angular.module('daksportsApp')
        .factory('Auth', ['$rootScope', '$http', '$filter', '$firebaseAuth', 'FIREBASE_URL', '$location', 'productRes',
            function($rootScope, $http, $filter, $firebaseAuth, FIREBASE_URL, $location, productRes) {
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
                                $http.get('api/accounts/getuserfav.php?uid=' + authData.uid)
                                    .then(function(response) {
                                        $rootScope.userData.favs = response.data;
                                        productRes.query()
                                            .then(function(items) {
                                                $rootScope.products = items;
                                                angular.forEach($rootScope.userData.favs, function(value, key) {
                                                    setFavourite(value);
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
                        .then(function(items) {
                            $rootScope.products = items;
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
