(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('ProductCtrl', function($scope, $rootScope, $location, $http, $parse, $filter, $timeout, $stateParams, $state, $mdDialog, $mdToast, productRes, ngCart) {

            //-----------------------------------------
            //  INITIAL STATE
            //-----------------------------------------
            $scope.slides = [];
            $scope.typesFilter = [];
            $scope.kindsFilter = [];

            var info = $location.protocol();
            console.log(info);

            // Make appbar transparent
            $rootScope.transparentAppbar = true;
            $rootScope.mainScrolled = false;
            $scope.$on('$destroy', function() {
                // Make sure that the interval is destroyed too
                $rootScope.transparentAppbar = false;
                $rootScope.mainScrolled = true;
                $scope.typeFilter = [];
            });
            $scope.$on('$viewContentLoaded', function(event) {
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
            $scope.hero = $scope.heroes[rnd - 1];

            // Initial state

            function getProduct(){
                $scope.product = $filter('filter')($rootScope.products, function(d) {
                    return d.code === $stateParams.productCode;
                })[0];

                $scope.typesFilter.push($scope.product.type);
                $scope.kindsFilter.push($scope.product.kind);
                var filteredTypes = $filter('typeFilter')($rootScope.products, $scope.typesFilter);
                var filteredKinds = $filter('kindFilter')($rootScope.products, $scope.kindsFilter);
                $scope.sameTypeProducts = $filter('excludeFilter')(filteredTypes, $scope.product.code);
                $scope.sameKindProducts = $filter('excludeFilter')(filteredKinds, $scope.product.code);

                angular.forEach($scope.product, function(value, key) {
                    if (key.indexOf('file') > -1 && value.indexOf('placeholder') == -1) {
                        $scope.slides.push(value);
                        $scope.sliderLength = $scope.slides.length;
                    }
                });
            };

            if (!$rootScope.products) {
                $scope.$on('products:filled', function() {
                    getProduct();
                });
            } else if ($rootScope.products) {
                getProduct();
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
                    angular.forEach($scope.product.reviews, function(review) {
                        if (review.rating == 1) {
                            $scope.onestar = $scope.onestar + 1;
                        } else if (review.rating == 2) {
                            $scope.twostar = $scope.twostar + 1;
                        } else if (review.rating == 3) {
                            $scope.threestar = $scope.threestar + 1;
                        } else if (review.rating == 4) {
                            $scope.fourstar = $scope.fourstar + 1;
                        } else if (review.rating == 5) {
                            $scope.fivestar = $scope.fivestar + 1;
                        };
                        if (review.review != "") {
                            $scope.filledreviews.push(review);
                        };
                    });
                });
            } else {
                $scope.currentRating = $filter('quantize')($scope.product.rating, 5);
                angular.forEach($scope.product.reviews, function(review) {
                    if (review.rating == 1) {
                        $scope.onestar = $scope.onestar + 1;
                    } else if (review.rating == 2) {
                        $scope.twostar = $scope.twostar + 1;
                    } else if (review.rating == 3) {
                        $scope.threestar = $scope.threestar + 1;
                    } else if (review.rating == 4) {
                        $scope.fourstar = $scope.fourstar + 1;
                    } else if (review.rating == 5) {
                        $scope.fivestar = $scope.fivestar + 1;
                    };
                    if (review.review != "") {
                        $scope.filledreviews.push(review);
                    };
                });
            }

            //-----------------------------------------
            //  USER REVIEW FORM
            //-----------------------------------------

            $scope.resetReview = {
                rated: false,
                rating: 0,
                title: '',
                body: '',
                added: new Date(),
            };
            $scope.userReview = {
                rated: false,
                rating: 0,
                title: '',
                body: '',
                added: new Date(),
            };

            $scope.writeReview = false;
            $scope.formSubmitted = false;

            var tempRating = 0;

            $scope.setRating = function(stars) {
                $scope.userReview.rating = stars;
            };
            $scope.unsetRating = function() {
                if (!$scope.userReview.rated) {
                    $scope.userReview.rating = 0;
                } else {
                    $scope.userReview.rating = tempRating;
                }
            };
            $scope.rate = function(stars) {
                $scope.userReview.rated = true;
                $scope.userReview.rating = stars;
                tempRating = stars;
            };

            $scope.showSimpleToast = function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Review-ul tau va fi publicat in scurt timp')
                    .hideDelay(3000)
                );
            };
            $scope.showErrorToast = function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Am intampinat o eroare, incearca putin mai tarziu!')
                    .action('Ok')
                    .hideDelay(0)
                );
            };
            $scope.discardReview = function(){
                $scope.userReview = angular.copy($scope.resetReview);
                tempRating = 0;
                $scope.formSubmitted = false;
                $scope.reviewForm.$setPristine();
                $scope.reviewForm.$setUntouched();
                $scope.writeReview = false;
            };
            $scope.submitReview = function() {
                var title = $scope.userReview.title;
                var body = $scope.userReview.body;
                var rating = $scope.userReview.rating;
                $scope.formSubmitted = true;
                if (!title && !body && !rating) {
                    // do shit
                } else {
                    var data = $scope.userReview;
                    data.code = $scope.product.code;
                    data.userid = $rootScope.userData.uid;
                    $http.post('api/reviews/post.php', data)
                        .then(function(response) {
                            $scope.showSimpleToast();
                        }).catch(function(error) {
                            $scope.showErrorToast();
                        });
                }
            };


        });

})();
