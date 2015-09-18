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
                // return items;
                if (!angular.isObject(range)) {
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (range.max && item.price >= range.min && item.price < range.max) {
                        filtered.push(item);
                    }else if (!range.max && item.price >= range.min){
                        filtered.push(item);
                    }
                });
                return filtered;
            };
        })
        .filter('dummyBrandFilter', function($rootScope) {
            return function(items, brand) {
                var filtered = [];
                // return items;
                if (brand.length <= 0) {
                    // console.log("updating from brands");
                    if ($rootScope.activeFilter == 'brands' || !$rootScope.activeFilter || $rootScope.activeFilter == "") {
                    $rootScope.filteredTypes = angular.copy(items);
                    $rootScope.filteredKinds = angular.copy(items);
                    $rootScope.filteredPrice = angular.copy(items);
                    }
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.brand && brand.indexOf(item.brand) > -1) {
                        filtered.push(item);
                    }
                });
                // console.log("updating from brands");
                if ($rootScope.activeFilter == 'brands') {
                    $rootScope.filteredTypes = angular.copy(filtered);
                    $rootScope.filteredKinds = angular.copy(filtered);
                    $rootScope.filteredPrice = angular.copy(filtered);
                }
                // console.log($rootScope.activeFilter);
                return filtered;
            };
        })
        .filter('dummyTypeFilter', function($rootScope) {
            return function(items, type) {
                var filtered = [];
                // return items;
                // console.log(type);
                if (type.length <= 0) {
                    // console.log("updating from main types");
                    if (!$rootScope.activeFilter) {
                    $rootScope.filteredBrands = angular.copy(items);
                    $rootScope.filteredKinds = angular.copy(items);
                    $rootScope.filteredPrice = angular.copy(items);
                    }
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.type && type.indexOf(item.type) > -1) {
                        filtered.push(item);
                    }
                });
                // console.log("updating from main types");
                if ($rootScope.activeFilter == 'mains' || !$rootScope.activeFilter || $rootScope.activeFilter == "") {
                    $rootScope.filteredBrands = angular.copy(filtered);
                    $rootScope.filteredKinds = angular.copy(filtered);
                    $rootScope.filteredPrice = angular.copy(filtered);
                }
                // console.log($rootScope.activeFilter);
                return filtered;
            };
        })
        .filter('dummyKindFilter', function($rootScope) {
            return function(items, kind) {
                var filtered = [];
                // return items;
                if (kind.length <= 0) {
                    // console.log("updating from sub kinds");
                    if ($rootScope.activeFilter == 'subs' || !$rootScope.activeFilter || $rootScope.activeFilter == "") {
                    $rootScope.filteredBrands = angular.copy(items);
                    $rootScope.filteredTypes = angular.copy(items);
                    $rootScope.filteredPrice = angular.copy(items);
                    }
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.kind && kind.indexOf(item.kind) > -1) {
                        filtered.push(item);
                    }
                });
                // console.log("updating from sub kinds");
                if ($rootScope.activeFilter == 'subs') {
                    $rootScope.filteredBrands = angular.copy(filtered);
                    $rootScope.filteredTypes = angular.copy(filtered);
                    $rootScope.filteredPrice = angular.copy(filtered);
                }
                // console.log($rootScope.activeFilter);
                return filtered;
            };
        })
        .filter('dummyPriceFilter', function($rootScope) {
            return function(items, range) {
                var filtered = [];
                // return items;
                if (!angular.isObject(range)) {
                    if ($rootScope.activeFilter == 'price' || !$rootScope.activeFilter || $rootScope.activeFilter == "") {
                        $rootScope.filteredBrands = angular.copy(items);
                        $rootScope.filteredTypes = angular.copy(items);
                        $rootScope.filteredKinds = angular.copy(items);
                    }
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (range.max && item.price >= range.min && item.price < range.max) {
                        filtered.push(item);
                    }else if (!range.max && item.price >= range.min){
                        filtered.push(item);
                    }
                });
                if ($rootScope.activeFilter == 'price') {
                    $rootScope.filteredBrands = angular.copy(filtered);
                    $rootScope.filteredTypes = angular.copy(filtered);
                    $rootScope.filteredKinds = angular.copy(items);
                }
                return filtered;
            };
        });

})();
