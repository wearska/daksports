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
                            }).catch(function(error) {
                                return error;
                            });
                    }
                });
                return authObj;
            }
        ]);

})();
