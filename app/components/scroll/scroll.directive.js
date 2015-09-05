(function() {
  'use strict';

  angular.module('daksportsApp')
    .directive("gdScroll", function ($window, $rootScope) {
        return function(scope, element, attrs) {
            var i = 0;
            element.bind("scroll", function() {
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