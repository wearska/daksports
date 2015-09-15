(function() {
    'use strict';

    angular.module('daksportsApp')
        .factory('BrandFilter', function($rootScope, $http, $filter) {
            var obj = {};
            obj.selected = [];
            obj.active = false;

            obj.toggle = function(brand) {
                var idx = obj.selected.indexOf(brand);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(brand);
                $rootScope.activeFilter = "brands";
                obj.active = true;
                if (!obj.selected.length) {
                    $rootScope.activeFilter = "";
                    obj.active = false;
                    $rootScope.filteredSubCats = [];
                    $rootScope.filteredMainCats = [];
                }
                $rootScope.brandsActive = obj.active;
            };
            obj.exists = function(brand) {
                return obj.selected.indexOf(brand) > -1;
            };
            obj.count = function(brand) {
                if ($rootScope.mainsActive || $rootScope.subsActive) {
                    return $filter('brandFilter')($rootScope.filteredBrands, brand).length;
                } else {
                    return $filter('brandFilter')($rootScope.products, brand).length;
                }
            }
            obj.reset = function() {
                obj.selected = [];
                obj.active = false;
            }

            return obj;
        })
        .factory('MainCatFilter', function($rootScope, $http, $filter) {
            var obj = {};
            obj.selected = [];
            obj.active = false;

            obj.toggle = function(cat) {
                console.log(cat);
                var idx = obj.selected.indexOf(cat);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(cat);
                $rootScope.activeFilter = "mains";
                obj.active = true;
                if (!obj.selected.length) {
                    $rootScope.activeFilter = "";
                    obj.active = false;
                    $rootScope.filteredSubCats = [];
                    $rootScope.filteredBrands = [];
                }
                $rootScope.mainsActive = obj.active;
            };
            obj.exists = function(cat) {
                return obj.selected.indexOf(cat) > -1;
            };
            obj.count = function(cat) {
                if ($rootScope.brandsActive || $rootScope.subsActive) {
                    return $filter('mainCatFilter')($rootScope.filteredMainCats, cat).length;
                } else {
                    return $filter('mainCatFilter')($rootScope.products, cat).length;
                }
            }
            obj.reset = function() {
                obj.selected = [];
                obj.active = false;
            }
            return obj;
        })
        .factory('SubCatFilter', function($rootScope, $http, $filter) {
            var obj = {};
            obj.selected = [];
            obj.active = false;

            obj.toggle = function(cat) {
                console.log(cat);
                var idx = obj.selected.indexOf(cat);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(cat);
                $rootScope.activeFilter = "subs";
                obj.active = true;
                if (!obj.selected.length) {
                    $rootScope.activeFilter = "";
                    obj.active = false;
                }
                $rootScope.subsActive = obj.active;
            };
            obj.exists = function(cat) {
                return obj.selected.indexOf(cat) > -1;
            };
            obj.count = function(cat) {
                if ($rootScope.brandsActive || $rootScope.mainsActive) {
                    return $filter('subCatFilter')($rootScope.filteredSubCats, cat).length;
                }else{
                    return $filter('subCatFilter')($rootScope.products, cat).length;
                }
            }
            obj.reset = function() {
                obj.selected = [];
                obj.active = false;
            }
            return obj;
        })
        .factory('PriceFilter', function($rootScope, $http, $filter) {
            var obj = {};
            obj.ranges = [
                {
                    'min' : 0,
                    'max' : 50
                },
                {
                    'min' : 50,
                    'max' : 100
                },
                {
                    'min' : 100,
                    'max' : 150
                },
                {
                    'min' : 150,
                    'max' : 200
                },
                {
                    'min' : 200,
                    'max' : 250
                },
                {
                    'min' : 250,
                    'max' : 300
                },
                {
                    'min' : 300,
                    'max' : 350
                },
                {
                    'min' : 350,
                    'max' : 400
                },
                {
                    'min' : 400,
                    'max' : 450
                },
                {
                    'min' : 450,
                    'max' : 500
                },
                {
                    'min' : 500,
                    'max' : undefined
                }
            ];
            
            obj.toggle = function(cat) {
                $rootScope.activeFilter = "price";
                obj.active = true;
                if (obj.selected == null) {
                    $rootScope.activeFilter = "";
                    obj.active = false;
                }
                $rootScope.priceActive = obj.active;
            };
            obj.count = function(range) {
                if ($rootScope.brandsActive || $rootScope.mainsActive || $rootScope.subsActive) {
                    return $filter('priceFilter')($rootScope.filteredPrice, range).length;
                }else{
                    return $filter('priceFilter')($rootScope.products, range).length;
                }
            }
            obj.selected = null;
            obj.active = false;

            return obj;
        });

})();
