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
                    $rootScope.filteredKinds = [];
                    $rootScope.filteredTypes = [];
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
        .factory('TypeFilter', function($rootScope, $http, $filter) {
            var obj = {};
            obj.selected = [];
            obj.active = false;

            obj.toggle = function(type) {
                console.log(type);
                var idx = obj.selected.indexOf(type);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(type);
                $rootScope.activeFilter = "mains";
                obj.active = true;
                if (!obj.selected.length) {
                    $rootScope.activeFilter = "";
                    obj.active = false;
                    $rootScope.filteredKinds = [];
                    $rootScope.filteredBrands = [];
                }
                $rootScope.mainsActive = obj.active;
            };
            obj.exists = function(type) {
                return obj.selected.indexOf(type) > -1;
            };
            obj.count = function(type) {
                if ($rootScope.brandsActive || $rootScope.subsActive) {
                    return $filter('typeFilter')($rootScope.filteredTypes, type).length;
                } else {
                    return $filter('typeFilter')($rootScope.products, type).length;
                }
            }
            obj.reset = function() {
                obj.selected = [];
                obj.active = false;
            }
            return obj;
        })
        .factory('KindFilter', function($rootScope, $http, $filter) {
            var obj = {};
            obj.selected = [];
            obj.active = false;

            obj.toggle = function(kind) {
                console.log(kind);
                var idx = obj.selected.indexOf(kind);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(kind);
                $rootScope.activeFilter = "subs";
                obj.active = true;
                if (!obj.selected.length) {
                    $rootScope.activeFilter = "";
                    obj.active = false;
                }
                $rootScope.subsActive = obj.active;
            };
            obj.exists = function(kind) {
                return obj.selected.indexOf(kind) > -1;
            };
            obj.count = function(kind) {
                if ($rootScope.brandsActive || $rootScope.mainsActive) {
                    return $filter('kindFilter')($rootScope.filteredKinds, kind).length;
                }else{
                    return $filter('kindFilter')($rootScope.products, kind).length;
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

            obj.toggle = function(price) {
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
