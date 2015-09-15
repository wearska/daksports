(function() {
  'use strict';

  angular.module('daksportsApp')
    .directive("gdScroll", function ($window, $rootScope) {
        return function(scope, element, attrs) {
            var i = 0;
            var wHeight = $window.outerHeight;
            var page = angular.element(element).find('.page-content');
            element.bind("scroll", function() {
                scope.scrollAmnt = angular.element(this)[0].scrollTop;
                var sHeight = page.outerHeight() + page[0].offsetTop + 96;

                if (($window.outerHeight + scope.scrollAmnt) >= sHeight && !$rootScope.scrolledBottom) {
                    console.log('scrolledBottom');
                    $rootScope.scrolledBottom = true;
                }else if(($window.outerHeight + scope.scrollAmnt) < sHeight && $rootScope.scrolledBottom){
                    $rootScope.scrolledBottom = false;
                }
                 if (angular.element(this)[0].scrollTop >= 16) {
                     i++
                     if (i === 1){
                         $rootScope.mainScrolled = true;
                     }
                 } else {
                     i = 0;
                     $rootScope.mainScrolled = false;
                 }
                scope.$apply();
            });
        };
    });

})();
