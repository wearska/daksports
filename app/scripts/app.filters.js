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
        .filter('searchProduct', function() {
            return function(products, query) {
                var filtered = [];
                var hashes = [];
                var searchArr = query.split(' ');
                if (!searchArr.length) {
                    return products;
                }
                angular.forEach(products, function(product) {
                    var pName = angular.lowercase(product.name);
                    var pSubname = angular.lowercase(product.subname);
                    var pTags = product.tags;
                    var pBrand = angular.lowercase(product.brand);
                    var pType = angular.lowercase(product.type);
                    var pKind = angular.lowercase(product.kind);
                    angular.forEach(searchArr, function(search) {
                        if (pName.indexOf(angular.lowercase(search)) != -1 || pSubname.indexOf(angular.lowercase(search)) != -1 || pTags.indexOf(angular.lowercase(search)) != -1 || pBrand.indexOf(angular.lowercase(search)) != -1 || pType.indexOf(angular.lowercase(search)) != -1 || pKind.indexOf(angular.lowercase(search)) != -1) {
                            if (hashes.indexOf(product.$$hashKey) == -1) {
                                filtered.push(product);
                                hashes.push(product.$$hashKey);
                            }
                        }
                    })
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
        .filter('maxCount', function() {
            return function(input, value) {
                if (input != null && input != undefined && input > value) {
                    return value;
                } else {
                    return input;
                }
            };
        })
        .filter('quantize', function() {
            return function(input, steps) {
                var step = 100 / steps;
                var halfstep = step / 2;
                if (input != null && input != undefined) {
                    input = parseFloat(input);
                    while (--steps + 1 > 0) {
                        var threshold = step * steps + halfstep;
                        if (input >= threshold) {
                            return steps + 1;
                            break;
                        }
                    }
                }
            };
        })
        .filter('capitalize', function() {
            return function(input) {
                var capitalized = [];
                if (input === undefined) {
                    input = [];
                }
                angular.forEach(input, function(value) {
                    capitalized.push(value.charAt(0).toUpperCase() + value.substring(1));
                });
                return capitalized;
            }
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
        .filter('shortify', function() {
            return function(input) {
                if (input != null && input != undefined && input !== "") {
                    return angular.uppercase(input.replace(/[aeiou]/ig, '').substring(0, 3));
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
        .filter('linebreak', function() {
            return function(input) {
                return input ? input.replace(/[\n]/g, '<br/>') : input;
            };
        })
        .filter('float', function() {
            return function(input) {
                if (input != null && input != undefined && input !== "") {
                    return input.toFixed(2);
                }
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
        });

})();
