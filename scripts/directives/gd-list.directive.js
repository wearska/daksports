'use strict';
angular.module('daksportsApp')
    .directive('gdList', function() {
        return {
            restrict: 'E',
            scope : true,
            transclude: true,
            link : function(scope, element, attrs, options){
                console.log(options);
                var classList = 'grid-full-width gxs' + attrs.gdXsGrid + ' light-theme';
                element.addClass(classList);
            }
        }
    });