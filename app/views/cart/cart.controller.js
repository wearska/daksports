(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('CartCtrl', function($rootScope, $scope, gdShoppingCart) {

            $scope.cart = gdShoppingCart;
            $scope.updateList = function(item){
                $rootScope.$broadcast('gdCart: changed', {});
            };

            // -------------------------------
            // ORDER INFO
            // -------------------------------
            $scope.paymentOptions = [
                'Ramburs'
            ];
            $scope.userAgreement = true;
            $scope.order = {
                discount: 0,
                billing:{}
            };
            var order = $scope.order;

            var updateOrder = function(){
                var user = $rootScope.userData;
                order.billing.name =  user.last_name + " " + user.first_name;
                order.billing.type =  user.defaults.billing;
                if(order.billing.type === 'personal'){
                    order.billing.address = user.addresses[user.defaults.address];
                } else if (order.billing.type === 'business'){
                    order.billing.address = user.businesses[user.defaults.address];
                }


                order.payment = {
                    type: 0
                };

                order.contact = angular.copy(user.contact);
            };

            $scope.$on('userData: loaded', updateOrder);
            if($rootScope.userData){
                updateOrder();
            };

        });

})();
