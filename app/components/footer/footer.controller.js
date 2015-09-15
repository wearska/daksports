(function() {
  'use strict';

  angular.module('daksportsApp')
    .controller('FooterCtrl', function($rootScope, $scope, $location, $timeout, ngCart) {

      // TOGGLE FOOTER
      $scope.expandedFooter = false;
      $scope.expandFooter = function() {
        $scope.expandedFooter = !$scope.expandedFooter;
      };
      $scope.showFooter = function() {
        $scope.showFooter = false;
      };

    });

})();
