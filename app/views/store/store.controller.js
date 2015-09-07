(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('StoreCtrl', function($rootScope, $scope, $state, BrandFilter, MainCatFilter, SubCatFilter) {
            $rootScope.state = $state.current.name;
            $scope.filtered = [];

            $scope.$on('$destroy', function() {
                // Make sure that the interval is destroyed too
                $rootScope.state = undefined;
            });

            // FILTERS
            $scope.BrandFilter = BrandFilter;
            $scope.MainCatFilter = MainCatFilter;
            $scope.SubCatFilter = SubCatFilter;

            $scope.toggle = function(brand, list) {
                console.log("toggle");
                var idx = list.indexOf(brand);
                if (idx > -1) list.splice(idx, 1);
                else list.push(brand);
            };
            $scope.exists = function(brand, list) {
                return list.indexOf(brand) > -1;
            };
        });

})();
