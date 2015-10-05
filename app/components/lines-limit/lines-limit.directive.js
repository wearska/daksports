(function() {
    'use strict';

    angular.module('daksportsApp')
        .directive('gdLinesLimit', function($window) {
            return function(scope, element, attrs) {
                var fontSize = angular.element(element).css('font-size');
                var lineHeight = angular.element(element).css('line-height');
                var update = function() {
                    // console.log(fontSize);
                    // console.log(lineHeight);
                }
                update();
            };
        });

})();
