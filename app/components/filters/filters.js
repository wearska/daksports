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
        })
        .filter('dummyBrandFilter', function($rootScope) {
            return function(items, brand) {
                var filtered = [];
                // return items;
                if (brand.length <= 0) {
                    // console.log("updating from brands");
                    if ($rootScope.activeFilter == 'brands' || !$rootScope.activeFilter || $rootScope.activeFilter == "") {
                    $rootScope.filteredMainCats = angular.copy(items);
                    $rootScope.filteredSubCats = angular.copy(items);
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
                    $rootScope.filteredMainCats = angular.copy(filtered);
                    $rootScope.filteredSubCats = angular.copy(filtered);
                }
                console.log($rootScope.activeFilter);
                return filtered;
            };
        })
        .filter('dummyMainCatFilter', function($rootScope) {
            return function(items, cat) {
                var filtered = [];
                // return items;
                console.log(cat);
                if (cat.length <= 0) {
                    // console.log("updating from main cats");
                    if (!$rootScope.activeFilter) {
                    $rootScope.filteredBrands = angular.copy(items);
                    $rootScope.filteredSubCats = angular.copy(items);
                    }
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.main_cat && cat.indexOf(item.main_cat) > -1) {
                        filtered.push(item);
                    }
                });
                // console.log("updating from main cats");
                if ($rootScope.activeFilter == 'mains' || !$rootScope.activeFilter || $rootScope.activeFilter == "") {
                    $rootScope.filteredBrands = angular.copy(filtered);
                    $rootScope.filteredSubCats = angular.copy(filtered);
                }
                console.log($rootScope.activeFilter);
                return filtered;
            };
        })
        .filter('dummySubCatFilter', function($rootScope) {
            return function(items, cat) {
                var filtered = [];
                // return items;
                if (cat.length <= 0) {
                    // console.log("updating from sub cats");
                    if ($rootScope.activeFilter == 'subs' || !$rootScope.activeFilter || $rootScope.activeFilter == "") {
                    $rootScope.filteredBrands = angular.copy(items);
                    $rootScope.filteredMainCats = angular.copy(items);
                    }
                    return items;
                }
                angular.forEach(items, function(item) {
                    if (item.sub_cat && cat.indexOf(item.sub_cat) > -1) {
                        filtered.push(item);
                    }
                });
                // console.log("updating from sub cats");
                if ($rootScope.activeFilter == 'subs') {
                    $rootScope.filteredBrands = angular.copy(filtered);
                    $rootScope.filteredMainCats = angular.copy(filtered);
                }
                console.log($rootScope.activeFilter);
                return filtered;
            };
        });

})();
