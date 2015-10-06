(function() {
    'use strict';

    angular
        .module('ngShoppingLists')
        .factory('ngShoppingList', function($http, $rootScope, $q, $filter) {
            
            var date = new Date();
            var year = $filter('date')(date, 'yy'),
                month = $filter('date')(date, 'MM'),
                day = $filter('date')(date, 'dd');
            var idPrefix = '' + year + month + day + '';
            
            var list = {
                id: $filter('serialize')(idPrefix),
                added: new Date(),
                shipping: null,
                taxRate: null,
                tax: null,
                discount: null,
                items: []
            };
            
            return list;
        });

})();