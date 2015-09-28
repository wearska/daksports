(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('ProductCtrl', function($scope, $rootScope, $http, $parse, $filter, $timeout, $stateParams, $state, $mdDialog, productRes, ngCart) {

            //-----------------------------------------
            //  INITIAL STATE
            //-----------------------------------------
            $scope.slides = [];

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
            $scope.heroes = [{
                file: 'assets/img/heroes/baschet.jpg',
                position: 'right'
            }, {
                file: 'assets/img/heroes/tenis.jpg',
                position: 'left'
            }, ]

            var rnd = $filter('randomize')($scope.heroes.length);
            console.log(rnd);
            $scope.hero = $scope.heroes[rnd - 1];

            // Initial state
            if (!$rootScope.products) {
                $scope.$on('products:filled', function() {
                    $scope.product = $filter('filter')($rootScope.products, function(d) {
                        return d.code === $stateParams.productCode;
                    })[0];

                    $scope.slides.push($scope.product.file1);
                    $scope.slides.push($scope.product.file2);
                    $scope.slides.push($scope.product.file3);
                    $scope.slides.push($scope.product.file4);
                    $scope.slides.push($scope.product.file5);
                    $scope.sliderLength = $scope.slides.length;
                });
            } else if ($rootScope.products) {
                $scope.product = $filter('filter')($rootScope.products, function(d) {
                    return d.code === $stateParams.productCode;
                })[0];

                $scope.slides.push($scope.product.file1);
                $scope.slides.push($scope.product.file2);
                $scope.slides.push($scope.product.file3);
                $scope.slides.push($scope.product.file4);
                $scope.slides.push($scope.product.file5);
                $scope.sliderLength = $scope.slides.length;
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

            $scope.addToCart = function() {
                ngCart.addItem($scope.product.code, $scope.product.name, parseFloat($scope.product.price), parseInt($scope.order.quantity), $scope.product);
            };


            //-----------------------------------------
            //  PRODUCT GALLERY
            //-----------------------------------------

            $scope.showGallery = function(ev) {
                $mdDialog.show({
                        controller: 'GdSliderCtrl',
                        templateUrl: 'app/views/product/product.gallery.inc.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    })
                    .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };


        });

})();
