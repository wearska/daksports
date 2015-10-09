(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('CartCtrl', function($rootScope, $scope, gdShoppingCart) {

            $scope.cart = gdShoppingCart;
            $scope.updateList = function(item){
                $rootScope.$broadcast('gdCart: changed', {});
            };

        });

})();
