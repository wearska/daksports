'use strict';
angular.module('daksportsApp')
    .directive('gdHeading', function() {
        return {
            restrict: 'E',
            scope: {
                title: '@',
                subtitle: '@'
            },
            controller: function($scope) {
            },
            replace: true,
            transclude : true,
            templateUrl: '/app/components/heading/heading.tpl.html',
            link: function(scope, el, attr) {
                if(!scope.subtitle){
                    scope.noSubtitle = true;
                    el.addClass("no-subtitle");
                }
            }
        }
    });