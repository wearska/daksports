(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('CartCtrl', function($rootScope, $scope, $filter, gdShoppingCart, gdOrder, $mdDialog) {

            $scope.cart = gdShoppingCart;
            $scope.updateList = function(item) {
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
                billing: {},
                items: $scope.cart.items,
                shipping: $scope.cart.shipping()
            };
            var order = $scope.order;

            $scope.initOrder = function() {
                var user = $rootScope.userData,
                    date = new Date(),
                    year = $filter('date')(date, 'yy'),
                    month = $filter('date')(date, 'MM'),
                    day = $filter('date')(date, 'dd'),
                    idPrefix = '' + year + month + day + '';
                order.id = $filter('serialize')(idPrefix);
                order.userid = user.uid;
                order.billing.name = user.last_name + " " + user.first_name;
                order.billing.type = user.defaults.billing;
                if (order.billing.type === 'personal') {
                    order.billing.address = user.addresses[user.defaults.address];
                } else if (order.billing.type === 'business') {
                    order.billing.address = user.businesses[user.defaults.business];
                }

                order.items = $scope.items;
                order.products = [];
                angular.forEach(order.items, function(item) {
                    order.products.push(item.product.code);
                });
                order.shipping = $scope.cart.shipping();
                order.total = $scope.cart.getTotal();

                order.payment = {
                    type: 0
                };

                order.contact = angular.copy(user.contact);
            };
            $scope.updateOrder = function() {
                var user = $rootScope.userData;
                order.userid = user.uid;
                if (order.billing.type === 'personal') {
                    order.billing.address = user.addresses[user.defaults.address];
                } else if (order.billing.type === 'business') {
                    order.billing.address = user.businesses[user.defaults.business];
                }
                order.items = $scope.cart.items;
                order.products = [];
                angular.forEach(order.items, function(item) {
                    order.products.push(item.product.code);
                });
                order.shipping = $scope.cart.shipping();
                order.total = $scope.cart.getTotal();
            };

            $scope.$on('userData: loaded', $scope.initOrder);
            if ($rootScope.userData) {
                $scope.initOrder();
            };

            $scope.placeOrder = function(event) {
                $scope.updateOrder();
                order.added = new Date();
                gdOrder.post($scope.order)
                .then(function(results) {
                        console.log(results);
                    });


                var parentEl = angular.element(document.body);
                $mdDialog.show({
                    parent: parentEl,
                    targetEvent: event,
                    template: '<md-dialog aria-label="Confirmare plasare comanda">' +
                        '  <md-dialog-content>' +
                        '<h1 class="title" style="font-size: 24px; font-weight: 900;">Iti multumim<h1>' +
                        '<h2 class="md-subhead">Comanda nr. <span style="color:rgb(183,28,28);">{{order.id}}</span> in valoare de {{order.total | number : 2}} RON, a fost inregistrata cu succes!</h2>' +
                        '<br>' +
                        '<p class="md-body-1">In scurt timp vei primi un email cu detaliile acesteia.</p>' +
                        '<p class="md-body-1">Pentru informatii suplimentare privind comanda ta, echipa noastra de operatori iti ofera suport 24 de ore din 24, in fiecare zi a saptamanii.</p>' +
                        '<br>' +
                        '<br>' +
                        '<span style="font-size: 24px; font-weight: 900; color:rgba(0,0,0,.34);">O zi excelenta!</span>' +
                        '<div class="confirm-dialog-logo" style="background-image:url(assets/img/daksports_logo_red_black_noborder.svg)"></div>' +
                        '  </md-dialog-content>' +
                        '  <div class="md-actions">' +
                        '    <a md-button class="md-primary" href="/contact" ng-click="closeDialog()" class="md-body-1">Contact</a>' +
                        '    <md-button ng-click="closeDialog();" class="md-primary">' +
                        '      Ok' +
                        '    </md-button>' +
                        '  </div>' +
                        '</md-dialog>',
                    locals: {
                        order: $scope.order,
                        cart: $scope.cart
                    },
                    controller: ConfirmOrderDialogCtrl
                });

                function ConfirmOrderDialogCtrl($scope, $location, $mdDialog, order, cart) {
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                        cart.empty();
                        $location.path('');
                    };
                    $scope.order = order;
                };
            };

        });

})();
