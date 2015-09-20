(function() {
    'use strict';

    angular
        .module('daksportsApp')
        .filter('brandFilter', function($rootScope) {
            return function(items, brand) {
                var filtered = [];
                // return items;
                if (brand.length <= 0) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.brand && brand.indexOf(item.brand) > -1) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('typeFilter', function($rootScope) {
            return function(items, type) {
                var filtered = [];
                // return items;
                if (type.length <= 0) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    var itemType = item.type;
                    // console.log(itemType);
                    if (itemType && type.indexOf(itemType) > -1) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('kindFilter', function($rootScope) {
            return function(items, kind) {
                var filtered = [];
                // return items;
                if (kind.length <= 0) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.kind && kind.indexOf(item.kind) > -1) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('priceFilter', function($rootScope) {
            return function(items, range) {
                var filtered = [];
                if(range != null){
                    range.min = parseFloat(range.min), range.max = parseFloat(range.max);
                }
                // return items;
                if (!angular.isObject(range)) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    
                    if(!range.min && !range.max){
                        filtered.push(item);
                    }else if(range.min && !range.max){
                        if(item.new_price >= range.min){
                            filtered.push(item);
                        }
                    }else if(!range.min && range.max){
                        if(item.new_price < range.max){
                            filtered.push(item);
                        }
                    }else if(range.min && range.max){
                        if(item.new_price >= range.min && item.new_price < range.max){
                            filtered.push(item);
                        }
                    }
                });
                return filtered;
            };
        })
        .filter('promoFilter', function() {
            return function(items, value) {
                var filtered = [];
                if (!value) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.promo == value) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        });

})();
