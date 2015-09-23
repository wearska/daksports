(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('ProductCtrl', function($scope, $rootScope, $http, $parse, $filter, $timeout, $stateParams, productRes, ngCart, $state) {

            // Make appbar transparent
            $rootScope.transparentAppbar = true;
            $rootScope.mainScrolled = false;
            $scope.$on('$destroy', function() {
                // Make sure that the interval is destroyed too
                $rootScope.transparentAppbar = false;
                $rootScope.mainScrolled = true;
            });
            $scope.$on('$viewContentLoaded', function(event) {
                // console.log("loaded");
                $rootScope.transparentAppbar = true;
                $rootScope.mainScrolled = false;
            });
            var code = $stateParams.productCode;

            // Initial state
            $scope.product = $filter('getItem')($rootScope.products, code);

            // filter the selected item once the products are loaded
            productRes.$loaded()
                .then(function() {
                    $timeout(function(){
                        $scope.product = $filter('getItem')($rootScope.products, code);
                    }, 1000);
                })
                .catch(function(error) {
                    console.log("Error:", error);
                });

            $scope.setMain = function(file) {
                file = file.replace(/(\.[\w\d_-]+)$/i, '_medium$1');
                $scope.mainView = file;
            }

            function setFavourite(code) {
                var product = $filter('filter')($rootScope.products, function(d) {
                    return d.code === code;
                })[0];
                product.favourite = true;
            };

            $scope.postFav = function(productid) {
                var data = {
                    userid: $rootScope.userData.uid,
                    code: product.code
                };
                $http.post('api/accounts/postuserfav.php', data)
                    .then(function(response) {
                        console.log(response);
                        $scope.product.favourite = true;
                        setFavourite(productid);
                    }).catch(function(error) {
                        console.log(error);
                    });
            };

            $scope.addToCart = function() {
                ngCart.addItem($scope.product.id, $scope.product.name, parseFloat($scope.product.price), parseInt($scope.order.quantity), $scope.product);
            };


        });

})();
