'use strict';
angular.module('daksportsApp')
    .directive('gdCard', function() {
        return {
            restrict: 'E',
            scope: {
                item: '=cardResource'
            },
            replace: true,
            templateUrl: '/modules/card/card.tpl.html',
            controller: function($scope){
            },
            link: function(scope, el, attr) {
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