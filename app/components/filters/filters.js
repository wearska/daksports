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
        .filter('mainCatFilter', function($rootScope) {
            return function(items, cat) {
                var filtered = [];
                // return items;
                if (cat.length <= 0) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.main_cat && cat.indexOf(item.main_cat) > -1) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('subCatFilter', function($rootScope) {
            return function(items, cat) {
                var filtered = [];
                // return items;
                if (cat.length <= 0) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.sub_cat && cat.indexOf(item.sub_cat) > -1) {
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        });

})();