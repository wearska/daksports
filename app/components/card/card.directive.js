(function() {
  'use strict';

  angular.module('daksportsApp')
    .directive('gdCard', function() {
      return {
        restrict: 'E',
        controller: 'CardCtrl',
        scope: {
          item: '=cardResource',
        },
        replace: true,
        templateUrl: 'app/components/card/card.tpl.html',
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

})();
