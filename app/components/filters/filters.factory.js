(function() {
    'use strict';

    angular.module('daksportsApp')
        .factory('BrandFilter', function($rootScope, $http, $filter) {
            var obj = {};
            obj.selected = [];

            obj.toggle = function(brand) {
                console.log(brand);
                var idx = obj.selected.indexOf(brand);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(brand);
            };
            obj.exists = function(brand) {
                return obj.selected.indexOf(brand) > -1;
            };
            obj.count = function(brand) {
                return $filter('brandFilter')($rootScope.filtered, brand).length;
            }
            obj.reset = function(){
                obj.selected = [];
            }
            return obj;
        })
        .factory('MainCatFilter', function($rootScope, $http, $filter) {
            var obj = {};
            obj.selected = [];

            obj.toggle = function(cat) {
                console.log(cat);
                var idx = obj.selected.indexOf(cat);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(cat);
            };
            obj.exists = function(cat) {
                return obj.selected.indexOf(cat) > -1;
            };
            obj.count = function(cat) {
                return $filter('mainCatFilter')($rootScope.filtered, cat).length;
            }
            obj.reset = function(){
                obj.selected = [];
            }
            return obj;
        })
        .factory('SubCatFilter', function($rootScope, $http, $filter) {
            var obj = {};
            obj.selected = [];

            obj.toggle = function(cat) {
                console.log(cat);
                var idx = obj.selected.indexOf(cat);
                if (idx > -1) obj.selected.splice(idx, 1);
                else obj.selected.push(cat);
            };
            obj.exists = function(cat) {
                return obj.selected.indexOf(cat) > -1;
            };
            obj.count = function(cat) {
                return $filter('subCatFilter')($rootScope.filtered, cat).length;
            }
            obj.reset = function(){
                obj.selected = [];
            }
            return obj;
        });

})();