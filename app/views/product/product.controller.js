(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('ProductCtrl', function($scope, $rootScope, $http, $parse, $filter, $timeout, $stateParams, $state, $mdDialog, productRes, ngCart) {

            //-----------------------------------------
            //  INITIAL STATE
            //-----------------------------------------
            $scope.slides = [];
            console.log("using product ctrl");

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

                    angular.forEach($scope.product, function(value, key) {
                        if (key.indexOf('file') > -1 && value.indexOf('placeholder') == -1) {
                            $scope.slides.push(value);
                            $scope.sliderLength = $scope.slides.length;
                        }
                    })
                });
            } else if ($rootScope.products) {
                $scope.product = $filter('filter')($rootScope.products, function(d) {
                    return d.code === $stateParams.productCode;
                })[0];

                angular.forEach($scope.product, function(value, key) {
                    if (key.indexOf('file') > -1 && value.indexOf('placeholder') == -1) {
                        $scope.slides.push(value);
                        $scope.sliderLength = $scope.slides.length;
                    }
                })
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
                        templateUrl: 'app/views/product/product.gallery.inc.html',
                        parent: angular.element(document.main),
                        targetEvent: ev,
                        clickOutsideToClose: true
                    })
                    .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });
            };

            //-----------------------------------------
            //  PRODUCT REVIEWS
            //-----------------------------------------

            $scope.onestar = 0;
            $scope.twostar = 0;
            $scope.threestar = 0;
            $scope.fourstar = 0;
            $scope.fivestar = 0;
            $scope.filledreviews = [];
            if (!$rootScope.products) {
                $scope.$on('ratings:filled', function() {
                    $scope.currentRating = $filter('quantize')($scope.product.rating, 5);
                    angular.forEach($scope.product.reviews, function(review){
                        if(review.rating == 1){
                            $scope.onestar = $scope.onestar + 1;
                        }else if(review.rating == 2){
                            $scope.twostar = $scope.twostar + 1;
                        }else if(review.rating == 3){
                            $scope.threestar = $scope.threestar + 1;
                        }else if(review.rating == 4){
                            $scope.fourstar = $scope.fourstar + 1;
                        }else if(review.rating == 5){
                            $scope.fivestar = $scope.fivestar + 1;
                        };
                        if(review.review != ""){
                            $scope.filledreviews.push(review);
                        };
                    });
                });
            }else{
                $scope.currentRating = $filter('quantize')($scope.product.rating, 5);
                angular.forEach($scope.product.reviews, function(review){
                    if(review.rating == 1){
                        $scope.onestar = $scope.onestar + 1;
                    }else if(review.rating == 2){
                        $scope.twostar = $scope.twostar + 1;
                    }else if(review.rating == 3){
                        $scope.threestar = $scope.threestar + 1;
                    }else if(review.rating == 4){
                        $scope.fourstar = $scope.fourstar + 1;
                    }else if(review.rating == 5){
                        $scope.fivestar = $scope.fivestar + 1;
                    };
                    if(review.review != ""){
                        $scope.filledreviews.push(review);
                    };
                });
            }

        });

})();
