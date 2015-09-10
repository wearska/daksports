(function() {
    'use strict';

    angular
        .module('daksportsApp')
        .filter('searchAdminList', function() {
            return function(products, search) {
                var filtered = [];
                if (!search) {
                    return products;
                }
                angular.forEach(products, function(product) {
                    if (angular.lowercase(product.name).indexOf(angular.lowercase(search)) != -1 || angular.lowercase(product.subname).indexOf(angular.lowercase(search)) != -1) {
                        filtered.push(product);
                    }
                });
                return filtered;
            };
        })
        .filter('promoFilter', function() {
            console.log('promo');
            return function(products, value) {
                var filtered = [];
                if (!value) {
                    return products;
                }
                angular.forEach(products, function(product) {
                    if (product.promo == value) {
                        filtered.push(product);
                    }
                });
                return filtered;
            };
        })
        .filter('randomize', function() {
            return function(input, scope) {
                if (input != null && input != undefined && input > 1) {
                    return Math.floor((Math.random() * input) + 1);
                }
            };
        })
        .filter('lowres', function() {
            return function(input) {
                return input ? input.replace(/(\.[\w\d_-]+)$/i, '_low$1') : input;
            };
        })
        .filter('medres', function() {
            return function(input) {
                return input ? input.replace(/(\.[\w\d_-]+)$/i, '_medium$1') : input;
            };
        })
        .filter('highres', function() {
            return function(input) {
                return input ? input.replace(/(\.[\w\d_-]+)$/i, '_high$1') : input;
            };
        })
        .filter('shuffle', function() {
            var shuffledArr = [],
                shuffledLength = 0;
            return function(arr) {
                var o = arr.slice(0, arr.length);
                if (shuffledLength == arr.length) return shuffledArr;
                for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
                shuffledArr = o;
                shuffledLength = o.length;
                return o;
            };
        });

})();
