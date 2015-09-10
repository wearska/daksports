(function() {
    'use strict';

    angular.module('daksportsApp')
        .factory('GdFilter', function($rootScope, $http, $filter) {
            var obj = {};
            obj.selectedBrands = [];
            obj.selectedMains = [];
            obj.selectedSubs = [];

            obj.toggle = function(item, list, listName) {
                var idx = list.indexOf(item);
                if (idx > -1) list.splice(idx, 1);
                else list.push(item);
                obj.filter(list, listName);
            };

            obj.exists = function(item, list) {
                return list.indexOf(item) > -1;
            };

            obj.filter = function(list, listName) {
                var filtered = $filter('gdFilter')($rootScope.products, list, listName);
                $rootScope.filtered = angular.copy(filtered);
            }

            obj.count = function(brand, listName){
                return $filter('gdFilter')($rootScope.products, brand, listName).length;
            }

            obj.reset = function(list) {
                if (list === 'brands') {
                    obj.selectedBrands = [];
                    obj.filter(obj.selectedBrands, 'brands');
                }else if (list === 'mains'){
                    obj.selectedMains = [];
                    obj.filter(obj.selectedMains);
                }else if (list === 'subs'){
                    obj.selectedSubs = [];
                    obj.filter(obj.selectedSubs);
                }
            }

            return obj;
        });

})();
