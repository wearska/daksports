(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('NavCtrl', function($rootScope, $scope, $location, $timeout, Auth, gdShoppingCart ,Counter, BrandFilter, TypeFilter, KindFilter, PriceFilter, PromoFilter, FitFilter) {

            // LOGOUT
            this.logout = function() {
                Auth.$unauth();
                $location.path('');
            };

            // FILTERS
            $scope.gdShoppingCart = gdShoppingCart;
            $scope.Counter = Counter;
            $scope.BrandFilter = BrandFilter;
            $scope.TypeFilter = TypeFilter;
            $scope.KindFilter = KindFilter;
            $scope.PriceFilter = PriceFilter;
            $scope.PromoFilter = PromoFilter;
            $scope.FitFilter = FitFilter;

            // MENU ITEMS
            this.navItems = [{
                title: 'Cos de cumparaturi',
                icon: 'assets/icons/ic_shopping_cart_24px.svg',
                ref: '/cart',
            }, {
                title: 'Magazin',
                icon: 'assets/icons/ic_store_24px.svg',
                ref: '/store'
            }];

            // SHOP ITEMS
            this.shopItems = [{
                title: 'Recomandari',
                icon: 'assets/icons/nav_whatshot_24px.svg',
                ref: '/recommended',
                filter: 'recommended'
            }, {
                title: 'Promotii',
                icon: 'assets/icons/nav_promo_24px.svg',
                ref: '/promos',
                filter: 'promo'
            }, {
                title: 'Sporturi',
                icon: 'assets/icons/nav_sports_24px.svg',
                ref: '/sports',
                filter: {
                    type: 'sports'
                }
            }, {
                title: 'Fitness',
                icon: 'assets/icons/nav_fitness_24px.svg',
                ref: '/fitness',
                filter: {
                    type: 'fitness'
                }

            }, {
                title: 'Alergare',
                icon: 'assets/icons/nav_running_24px.svg',
                ref: '/running',
                filter: {
                    type: 'alergare'
                }
            }, {
                title: 'Outdoor',
                icon: 'assets/icons/nav_outdoor_24px.svg',
                ref: '/outdoor',
                filter: {
                    type: 'outdoor'
                }
            }, {
                title: 'Accesorii',
                icon: 'assets/icons/nav_accessories_24px.svg',
                ref: '/accessories',
                filter: {
                    type: 'accesorii'
                }
            }];


        })
        .controller('NavSectionCtrl', function($rootScope, $scope, BrandFilter) {

        })
        .controller('NavListCtrl', function($rootScope, $scope, BrandFilter) {
            var scope = this;
            
            scope.size = 0;
            scope.size_acc = 44;
            scope.expanded = false;
            scope.expanded_acc = true;
            scope.expand = function() {
                scope.expanded = !scope.expanded;
                scope.expanded_acc = !scope.expanded_acc;
                (scope.expanded) ? scope.size = 30 : scope.size = 0;
                (scope.expanded_acc) ? scope.size_acc = 44 : scope.size_acc = 0;
            };
            scope.expand_acc = function(){
                scope.size_acc = 44;
                scope.expanded_acc = true;
            };
            scope.shrink_acc = function(){
                scope.size_acc = 0;
                scope.expanded_acc = false;
            };
            $scope.$on('store:open', scope.shrink_acc);
            $scope.$on('store:closed', scope.expand_acc);
        });

})();
