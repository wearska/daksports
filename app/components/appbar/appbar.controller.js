(function() {
  'use strict';

  angular.module('daksportsApp')
    .controller('AppBarCtrl', function($rootScope, $scope, $location, $timeout, ngCart) {

      // TOGGLE SEARCH BAR
      $scope.showSearchBar = false;
      $scope.toggleSearchBar = function() {
        $scope.showSearchBar = !$scope.showSearchBar;
      };
      $scope.hideSearchBar = function() {
        $scope.showSearchBar = false;
      };

    });

})();
