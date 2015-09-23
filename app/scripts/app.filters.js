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
                    if (angular.lowercase(product.name).indexOf(angular.lowercase(search)) != -1 || angular.lowercase(product.subname).indexOf(angular.lowercase(search)) != -1 || angular.lowercase(product.tags).indexOf(angular.lowercase(search)) != -1) {
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
        .filter('serialize', function() {
            return function(input) {
                if (input != null && input != undefined) {
                    var min = 10000;
                    var max = 99999;
                    var num = Math.floor(Math.random() * (max - min + 1)) + min;
                    return input + '' + num;
                }
            }
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
        .filter('float', function(){
            return function(input){
                return input.toFixed(2);
            }
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
        }).filter('getItem', function() {
            return function(items, code) {
                var filtered = {};
                if (code == "") {
                    return false;
                }
                console.log(items);
                angular.forEach(items, function(item) {
                    console.log(item.code);
                    if (item.code == code) {
                        filtered = angular.copy(item);
                        console.log(item);
                    }
                });
                return filtered;
            };
        });

})();
