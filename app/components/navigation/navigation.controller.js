(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('NavCtrl', function($rootScope, $scope, $location, $timeout, Auth, ngCart) {

            // LOGOUT
            this.logout = function() {
                Auth.$unauth();
            };

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
                ref: '/recommended'
            }, {
                title: 'Promotii',
                icon: 'assets/icons/nav_promo_24px.svg',
                ref: '/promos'
            }, {
                title: 'Sporturi',
                icon: 'assets/icons/nav_sports_24px.svg',
                ref: '/sports'
            }, {
                title: 'Fitness',
                icon: 'assets/icons/nav_fitness_24px.svg',
                ref: '/fitness'
            }, {
                title: 'Alergare',
                icon: 'assets/icons/nav_running_24px.svg',
                ref: '/running'
            }, {
                title: 'Outdoor',
                icon: 'assets/icons/nav_outdoor_24px.svg',
                ref: '/outdoor'
            }, {
                title: 'Accesorii',
                icon: 'assets/icons/nav_accessories_24px.svg',
                ref: '/accessories'
            }];

            // CART ITEMS
            $scope.cartItemsCount = ngCart.getTotalItems() + "";
            $scope.$on('ngCart:change', function(event, data) {
                $scope.cartItemsCount = ngCart.getTotalItems() + "";
            });

        });

})();