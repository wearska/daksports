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
            return obj;
        });

})();