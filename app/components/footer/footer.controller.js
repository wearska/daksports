(function() {
  'use strict';

  angular.module('daksportsApp')
    .controller('FooterCtrl', function($rootScope, $scope, $location, $timeout, ngCart) {

      // TOGGLE FOOTER
      $scope.showFooter = false;
      $scope.toggleFooter = function() {
        $scope.showFooter = !$scope.showFooter;
      };
      $scope.hideFooter = function() {
        $scope.showFooter = false;
      };

    });

})();
