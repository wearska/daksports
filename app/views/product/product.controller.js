(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('ProductCtrl', function($scope, $rootScope, $http, $parse, $filter, $timeout, $stateParams, productRes, ngCart) {
            // Initial state
            $scope.product = {};
            $scope.files = {};
            $scope.order = {
                data: $scope.product,
                quantity: 1
            };

            $scope.isFav = function() {
                var bool = true;
                return bool;
            }

            $scope.setMain = function(file) {
                file = file.replace(/(\.[\w\d_-]+)$/i, '_medium$1');
                $scope.mainView = file;
            }

            $scope.topDirections = ['left', 'up'];
            $scope.bottomDirections = ['down', 'right'];
            $scope.isOpen = false;
            $scope.availableModes = ['md-fling', 'md-scale'];
            $scope.selectedMode = 'md-fling';
            $scope.availableDirections = ['up', 'down', 'left', 'right'];
            $scope.selectedDirection = 'up';

            // ADD TO FAV

            function setFavourite(id) {
                var product = $filter('filter')($rootScope.products, function(d) {
                    return d.id === id;
                })[0];
                console.log(product);
                product.favourite = true;
            };

            $scope.postFav = function(productid) {
                var data = {
                    userid: $rootScope.userData.uid,
                    productid: productid
                };
                $http.post('api/accounts/postuserfav.php', data)
                    .then(function(response) {
                        console.log(response);
                        $scope.product.favourite = true;
                        setFavourite(productid);
                    }).catch(function(error) {
                        console.log(error);
                    });
            }

            productRes.get($stateParams.productId)
                .then(function(response) {
                    var i = 0;
                    $scope.product = response.data[0];
                    // SET SLIDE LENGTH
                    angular.forEach($scope.product, function(value, key) {
                        if (key.indexOf("file") !== -1 && value.indexOf("placeholder") == -1) {
                            i++;
                            $scope.sliderLength = i;
                            value = value.replace(/(\.[\w\d_-]+)$/i, '_medium$1');
                            var model = $parse(key);
                            model.assign($scope.files, value);
                        }
                        // CHECK IF FAV
                        $timeout(function() {
                            angular.forEach($rootScope.userData.favs, function(value, key) {
                                if ($scope.product.id == value) {
                                    $scope.product.favourite = true;
                                }
                            });
                        }, 1000);

                    });
                    $scope.product.sizes = [
                        "XS",
                        "S",
                        "M",
                        "L",
                        "XL"
                    ];
                    $scope.product.colours = [
                        "Rosu",
                        "Galben",
                        "Albastru"
                    ];
                }).catch(function(error) {
                    return error;
                });

            $scope.addToCart = function() {
                ngCart.addItem($scope.product.id, $scope.product.name, parseFloat($scope.product.price), parseInt($scope.order.quantity), $scope.product);
            };

        });

})();