(function() {
  'use strict';

  angular.module('daksportsApp')
    .controller('FilterBlockCtrl', function($scope) {

    })
    .controller('FilterParentCtrl', function($scope) {
      $scope.expanded = false;
      $scope.active = false;
      $scope.expand = function() {
        $scope.expanded = !$scope.expanded;
      }
    });

})();