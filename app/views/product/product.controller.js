(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('ProductCtrl', function($scope, $rootScope, $location, $http, $parse, $filter, $timeout, $stateParams, $state, $mdDialog, $mdToast, productRes, ngCart, gdShoppingLists, gdShoppingCart, gdRecent, Auth) {

            //-----------------------------------------
            //  INITIAL STATE
            //-----------------------------------------
            $scope.slides = [];
            $scope.typesFilter = [];
            $scope.kindsFilter = [];

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
            

            // Initial state

            function getProduct() {
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

                $scope.order = {
                    data: $scope.product,
                    quantity: 1,
                    size: {
                        name: ""
                    }
                };
            };

            if (!$rootScope.products) {
                $scope.$on('products:filled', function() {
                    getProduct();
                });
            } else if ($rootScope.products) {
                getProduct();
            }


            $scope.files = {};

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

            // ADD TO CART
            $scope.gdShoppingLists = gdShoppingLists;
            $scope.addToCart = function(item) {
                $scope.gdShoppingLists.addItem(gdShoppingLists.activeList(), $scope.product, $scope.order.size.name, $scope.order.quantity);
            };

            // ----------------------------------------
            // USER RECENT VIEWS
            // ----------------------------------------

            var updateRecents = function() {
                var user = $rootScope.userData;
                var code = $stateParams.productCode;
                angular.forEach(user.recent, function(recentCode) {
                    if (recentCode === code) {
                        var idx = user.recent.indexOf(recentCode);
                        user.recent.splice(idx, 1);
                    } else if (user.recent.length > 10) {
                        user.recent.splice(1, 1);
                    };
                });
                user.recent.push(code);
                gdRecent.query(user.recent);
                var data = {
                    uid: user.uid,
                    recent: user.recent
                };
                gdRecent.put(data);

            };

            if (Auth.$getAuth()) {
                if ($rootScope.userData) {
                    updateRecents();
                } else {
                    $scope.$on('userData: loaded', function() {
                        updateRecents();
                    });
                };
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
            $scope.discardReview = function() {
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
