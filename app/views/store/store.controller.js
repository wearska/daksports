(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('StoreCtrl', function($rootScope, $scope, $state, $timeout, BrandFilter, MainCatFilter, SubCatFilter, PriceFilter) {
            $rootScope.state = $state.current.name;
            $scope.filtered = [];

            $scope.limit = 16;
            $scope.$on('scroll:bottom', function(event, item) {
                $timeout(function(){
                    $scope.limit = $scope.limit + 8;
                }, 1000);
            });

            $rootScope.filtered = angular.copy($scope.filtered);

            $scope.$watch(
                // This function returns the value being watched. It is called for each turn of the $digest loop
                function() {
                    return $scope.filtered;
                },
                // This is the change listener, called when the value returned from the above function changes
                function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        // Only increment the counter if the value changed
                        $rootScope.filtered = angular.copy($scope.filtered);
                        (BrandFilter.selected.length > 0 || MainCatFilter.selected.length > 0 || SubCatFilter.selected.length > 0) ? $scope.limit = null: $scope.limit = 16;
                    }
                }
            );

            $scope.$on('$destroy', function() {
                // Make sure that the interval is destroyed too
                $rootScope.state = undefined;
            });

            // FILTERS
            $scope.BrandFilter = BrandFilter;
            $scope.MainCatFilter = MainCatFilter;
            $scope.SubCatFilter = SubCatFilter;
            $scope.PriceFilter = PriceFilter;

        });

})();
