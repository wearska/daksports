(function() {
        'use strict';

        angular
            .module('ngShoppingLists', [])
            
            .config([function() {

            }])
            
            .provider('$ngShoppingLists', function() {
                this.$get = function() {};
            })
            
            .run(function(ngShoppingLists) {
                ngShoppingLists.init();
            });
})();