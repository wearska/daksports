(function() {
    'use strict';

    angular
        .module('gdCart')
        .service('gdShoppingList', function($http, $rootScope, $q, $filter, gdCart) {

            var date = new Date();
            var year = $filter('date')(date, 'yy'),
                month = $filter('date')(date, 'MM'),
                day = $filter('date')(date, 'dd');
            var idPrefix = '' + year + month + day + '';

            this.reset = {
                id: $filter('serialize')(idPrefix),
                added: new Date(),
                shipping: null,
                taxRate: null,
                discount: null,
                active: true,
                items: []
            };

            this.list = {
                id: $filter('serialize')(idPrefix),
                added: new Date(),
                shipping: null,
                taxRate: null,
                discount: null,
                active: true,
                items: []
            };

            this.pushToCart = function(){
                var list = angular.copy(this.list);
                angular.forEach(gdCart.lists, function(list){
                    list.active = false;
                });
                gdCart.lists.push(list);
                $rootScope.$broadcast('gdCart: list-added', list);
                this.list = angular.copy(this.reset);
            };
        });

})();
