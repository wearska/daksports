(function() {
    'use strict';

    angular
        .module('ngShoppingLists')
        .service('ngShoppingLists', function($http, $rootScope, $q, $filter, ngShoppingList) {
            
            this.lists = [];
            this.lists.push(new ngShoppingList());
            console.log(this.lists);
            
        });

})();