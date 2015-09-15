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
                var sHeight = page.outerHeight() + page[0].offsetTop + 152;

                if (($window.outerHeight + scope.scrollAmnt) >= sHeight) {
                    console.log($window.innerHeight + scope.scrollAmnt);
                    console.log(sHeight);
                }
                 if (angular.element(this)[0].scrollTop >= 16) {
                     i++
                     scope.boolChangeClass = true;
                     if (i === 1){
                         $rootScope.mainScrolled = true;
                     }
                 } else {
                     i = 0;
                     scope.boolChangeClass = false;
                     $rootScope.mainScrolled = false;
                 }
                scope.$apply();
            });
        };
    });

})();
