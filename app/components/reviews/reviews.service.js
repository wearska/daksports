(function() {
    'use strict';

    angular
        .module('daksportsApp')
        .factory('reviews', function productResFactory($http, $rootScope, $q, $filter) {

            var api = 'api/reviews/';
            var obj = {};

            function setReviews(review, code) {
                var product = $filter('filter')($rootScope.products, function(d) {
                    return d.code === code;
                })[0];
                // console.log(product);
                product.reviews.push(review);
                // product.rating = (parseFloat(product.rating) + parseFloat(review.rating));
                // product.rating = product.rating / product.reviews.length;
            }

            obj.setRating = function(product) {
                var deferred = $q.defer();
                var promise = deferred.promise;
                if (product.reviews.length) {
                    promise.then(function() {
                        angular.forEach(product.reviews, function(review) {
                            product.rating = (parseFloat(product.rating) + parseFloat(review.rating));
                        });
                    }).then(function() {
                        product.rating = product.rating/product.reviews.length / 5 * 100;
                        $rootScope.$broadcast('ratings:filled', {});
                    });
                    deferred.resolve();
                }
            }

            obj.query = function() {
                return $http.get(api + 'query.php')
                    .then(function(response) {
                        var reviews = response.data;
                        var deferred = $q.defer();
                        var promise = deferred.promise;
                        promise.then(function() {
                            angular.forEach(reviews, function(review) {
                                setReviews(review, review.code);
                            });
                        }).then(function() {
                            angular.forEach($rootScope.products, function(product) {
                                obj.setRating(product);
                            });
                        });
                        deferred.resolve();
                        return reviews;
                    });
            };

            obj.get = function(id) {
                return $http.get(api + 'get.php?code=' + code);
            };

            obj.post = function(data) {
                return $http.post(api + 'post.php', data).then(function(results) {
                    return results;
                });
            };

            obj.put = function(data) {
                return $http.post(api + 'put.php', data).then(function(results) {
                    return results;
                });
            };

            obj.remove = function(id) {
                return $http.delete(api + 'remove.php?id=' + id).then(function(status) {
                    return status.data;
                });
            };

            return obj;
        });

})();