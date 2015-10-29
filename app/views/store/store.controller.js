(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('StoreCtrl', function($rootScope, $scope, $state, $window, $filter, $timeout, Counter, BrandFilter, TypeFilter, KindFilter, PriceFilter, PromoFilter, FitFilter, $stateParams) {

            var page = angular.element($window).find('.page-content');
            // $rootScope.state = $state.current.name;
            $rootScope.state = 'store';
            $rootScope.$broadcast('store:open', {});
            $scope.filtered = [];

            $scope.limit = 16;
            $scope.promoFilter = 0;
            $scope.$on('scroll:bottom', function(event, item) {
                $timeout(function() {
                    $scope.limit = $scope.limit + 8;
                }, 100);
            });
            $scope.$on('products:filled', function(event, item) {
                $timeout(function() {
                    $scope.filtered = $rootScope.products;
                    $rootScope.filtered = angular.copy($scope.filtered);
                }, 500);
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
                        $rootScope.filtered = angular.copy($scope.filtered);
                        $scope.limit = 16;
                        $scope.scrollToTop();
                    }
                }
            );

            $scope.$on('$destroy', function() {
                // Make sure that the interval is destroyed too
                $rootScope.state = undefined;
                $rootScope.$broadcast('store:closed', {});
            });

            //----------------------------
            // FILTERS
            //----------------------------

                // BrandFilter.selected = $stateParams.selectedBrands.split(",");
                // BrandFilter.selected = $filter('capitalize')(BrandFilter.selected);
                // TypeFilter.selected = $stateParams.selectedTypes.split(",");
                // TypeFilter.selected = $filter('capitalize')(TypeFilter.selected);
                // KindFilter.selected = $stateParams.selectedKinds.split(",");
                // KindFilter.selected = $filter('capitalize')(KindFilter.selected);\
                if($stateParams.brand){
                    BrandFilter.selected = $stateParams.brand;
                }
                if($stateParams.type){
                    TypeFilter.selected = $stateParams.type;
                }
                if($stateParams.kind){
                    KindFilter.selected = $stateParams.kind;
                }
                PromoFilter.state = $stateParams.promo;

            $scope.Counter = Counter;
            $scope.BrandFilter = BrandFilter;
            $scope.TypeFilter = TypeFilter;
            $scope.KindFilter = KindFilter;
            $scope.PriceFilter = PriceFilter;
            $scope.PromoFilter = PromoFilter;
            $scope.FitFilter = FitFilter;

            //----------------------------
            // SORT LIST
            //----------------------------

            $scope.sortOrder = 'added';
            $scope.sortReverse = true;

            $scope.sortList = [{
                order: 'added',
                name: 'Data'
            }, {
                order: 'new_price',
                name: 'Pret'
            },{
                order: 'name',
                name: 'Nume'
            }, {
                order: 'brand',
                name: 'Brand'
            }, {
                order: 'type',
                name: 'Departament'
            }, {
                order: 'kind',
                name: 'Categorie'
            }]
            $scope.promoSort = 0;

            $scope.promoToggle = function (value){
                console.log($scope.promoSort);
                PromoFilter.state = !$scope.promoSort;
            };

        });

})();
