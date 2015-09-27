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
                console.log("loaded");
                $rootScope.transparentAppbar = true;
                $rootScope.mainScrolled = false;
            });

            // Initial state
            if(!$rootScope.products){
                $scope.$on('products:filled', function(){
                    $scope.product = $filter('filter')($rootScope.products, function(d) {
                        return d.code === $stateParams.productCode;
                    })[0];
                    // var str = $scope.product.description;
                    // str = str.split(/\n/);
                    // $timeout(function(){
                    //     $scope.product.description = str;
                    // }, 3000)
                    // console.log($scope.product.description);
                });
            }else if($rootScope.products){
                $scope.product = $filter('filter')($rootScope.products, function(d) {
                    return d.code === $stateParams.productCode;
                })[0];
                // var str = $scope.product.description;
                // str = str.split(/\r?\n/);
                // $timeout(function(){
                //     console.log(str);
                //     $scope.product.description = str;
                // }, 3000)
                // console.log($scope.product.description);
            }
            
            
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

            // function setTypes(item) {
            //     item.added = new Date(item.added);
            //     item.inv = parseFloat(item.inv);
            //     item.price = parseFloat(item.price).toFixed(2);
            //     item.promo = parseFloat(item.promo);
            //     item.published = parseFloat(item.published);
            //     item.promo_price = parseFloat(item.promo_price).toFixed(2);
            //     item.promo_stock = parseFloat(item.promo_stock);
            //     if (item.promo && item.promo_price) {
            //         item.old_price = item.price;
            //         item.new_price = item.promo_price;
            //     } else {
            //         item.old_price = 0;
            //         item.new_price = item.price;
            //     };
            //     (item.tags) ? item.tags = item.tags.split(','): item.tags = [];
            //     (item.colours) ? item.colours = item.colours.split(','): item.colours = [];
            //     (angular.isDate(item.promo_end)) ? item.promo_end = item.promo_end: item.promo_end = new Date(item.promo_end);
            // }
            // 
            // // ADD TO FAV
            // 
            // function setFavourite(id) {
            //     var product = $filter('filter')($rootScope.products, function(d) {
            //         return d.id === id;
            //     })[0];
            //     console.log(product);
            //     product.favourite = true;
            // };

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

            // productRes.get($stateParams.productId)
            //     .then(function(response) {
            //         var i = 0;
            //         $scope.product = response.data[0];
            //         setTypes($scope.product);
            //         // SET SLIDE LENGTH
            //         angular.forEach($scope.product, function(value, key) {
            //             if (key.indexOf("file") !== -1 && value.indexOf("placeholder") == -1) {
            //                 i++;
            //                 $scope.sliderLength = i;
            //                 value = value.replace(/(\.[\w\d_-]+)$/i, '_medium$1');
            //                 var model = $parse(key);
            //                 model.assign($scope.files, value);
            //             }
            //             // CHECK IF FAV
            //             $timeout(function() {
            //                 angular.forEach($rootScope.userData.favs, function(value, key) {
            //                     if ($scope.product.code == value) {
            //                         $scope.product.favourite = true;
            //                     }
            //                 });
            //             }, 1000);
            // 
            //         });
            //         $scope.product.sizes = [
            //             "XS",
            //             "S",
            //             "M",
            //             "L",
            //             "XL"
            //         ];
            //         $scope.product.colours = [
            //             "Rosu",
            //             "Galben",
            //             "Albastru"
            //         ];
            //         $scope.product.rating = 50;
            //     }).catch(function(error) {
            //         return error;
            //     });

            $scope.addToCart = function() {
                ngCart.addItem($scope.product.code, $scope.product.name, parseFloat($scope.product.price), parseInt($scope.order.quantity), $scope.product);
            };


        });

})();