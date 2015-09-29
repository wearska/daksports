(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('SearchCtrl', function($rootScope, $scope, $state, $window, $timeout, Counter, BrandFilter, TypeFilter, KindFilter, PriceFilter, PromoFilter) {
            $rootScope.state = $state.current.name;

            $scope.searchResults = [];

            $scope.limit = 12;
            $scope.promoFilter = 0;
            $scope.$on('scroll:bottom', function(event, item) {
                $timeout(function(){
                    $scope.limit = $scope.limit + 8;
                }, 1000);
            });

            $rootScope.filtered = angular.copy($scope.searchResults);

            $scope.$watch(
                // This function returns the value being watched. It is called for each turn of the $digest loop
                function() {
                    return $scope.filtered;
                },
                // This is the change listener, called when the value returned from the above function changes
                function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        $rootScope.filtered = angular.copy($scope.filtered);
                        $scope.limit = 12;
                        console.log($window);
                        $scope.scrollToTop();
                    }
                }
            );

            $scope.$on('$destroy', function() {
                // Make sure that the interval is destroyed too
                $rootScope.state = undefined;
            });

            // FILTERS
            $scope.Counter = Counter;
            $scope.BrandFilter = BrandFilter;
            $scope.TypeFilter = TypeFilter;
            $scope.KindFilter = KindFilter;
            $scope.PriceFilter = PriceFilter;
            $scope.PromoFilter = PromoFilter;

        });

})();
