(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('NavCtrl', function($rootScope, $scope, $location, $timeout, Auth, ngCart, BrandFilter, TypeFilter, KindFilter, PriceFilter) {

            // LOGOUT
            this.logout = function() {
                Auth.$unauth();
            };

            // FILTERS
            $scope.BrandFilter = BrandFilter;
            $scope.TypeFilter = TypeFilter;
            $scope.KindFilter = KindFilter;
            $scope.PriceFilter = PriceFilter;

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

            // CART ITEMS
            $scope.cartItemsCount = ngCart.getTotalItems() + "";
            $scope.$on('ngCart:change', function(event, data) {
                $scope.cartItemsCount = ngCart.getTotalItems() + "";
            });

        })
        .controller('NavSectionCtrl', function($rootScope, $scope, BrandFilter) {

        })
        .controller('NavListCtrl', function($rootScope, $scope, BrandFilter) {

            this.size = 0;
            this.expanded = false;
            this.expand = function() {
                this.expanded = !this.expanded;
                (this.expanded) ? this.size = 30 : this.size = 0;
            };
            this.expand();

        });

})();
