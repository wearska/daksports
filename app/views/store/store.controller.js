(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('StoreCtrl', function($rootScope, $scope, $state, BrandFilter) {
            $rootScope.state = $state.current.name;

            $scope.$on('$destroy', function() {
                // Make sure that the interval is destroyed too
                $rootScope.state = undefined;
            });

            // brands filter
            $scope.BrandFilter = BrandFilter;
            
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