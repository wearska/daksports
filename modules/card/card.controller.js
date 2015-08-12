'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:CardCtrl
 * @description
 * # CardCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('CardCtrl', function($scope, $mdDialog, auth, cart) {

        $scope.cartItem = {
            'userid': "",
            'id': "",
            'price': "",
            'details': ""
        }

        // DUMMY CONTENT
        $scope.sizes = [
            'XS',
            'S',
            'M',
            'L',
            'XL',
            'XXl'
        ];

        // SHOW DIALOG
        $scope.status = '  ';
        $scope.showConfirm = function(ev) {
            $mdDialog.show({
                    // controller: "CardCtrl",
                    templateUrl: '/modules/card/card.dialog.tpl.html',
                    // parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        // ADD TO CART
        $scope.addToCart = function(item) {


            // cart.post(item);
            console.log($scope.products);
        }
    });
