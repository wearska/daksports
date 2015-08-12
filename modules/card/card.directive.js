'use strict';
angular.module('daksportsApp')
    .directive('gdCard', function(cart) {
        return {
            restrict: 'E',
            controller: 'CardCtrl',
            scope: {
                item: '=cardResource',
            },
            replace: true,
            templateUrl: '/modules/card/card.tpl.html',
            link: function(scope, el, attr) {
                // scope.addToCart = function(item) {
                //     cart.post(item)
                // };
            }
        }
    })
    .directive('gdTile', function() {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, el, attr) {
                el.addClass('gd-tile');
            }
        }
    });
