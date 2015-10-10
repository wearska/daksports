(function() {
  'use strict';

  angular.module('daksportsApp')
    .directive('gdShoppingList', function() {
      return {
        restrict: 'E',
        scope: {
          list: '=data',
        },
        replace: true,
        templateUrl: 'app/components/shopping-cart/shopping-list.tpl.html',
        link: function(scope, el, attr) {
            console.log(scope.list);
        }
      }
    });

})();