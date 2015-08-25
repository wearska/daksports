(function() {
  'use strict';

  angular.module('daksportsApp')
    .controller('NavCtrl', function($rootScope, $scope, $timeout, nav) {


      // nav toggle
      $scope.navOpen = nav.navOpen;
      $scope.toggleNav = function() {
        nav.toggleNav();
      };
      $scope.$watch(function() {
          return nav;
        },
        function(newVal, oldVal) {
          $scope.navOpen = nav.navOpen;
        }, true);

      $scope.subToggle = false;
      $scope.sports = false;
      $scope.accountMenu = false;
      $scope.mainToggle = function() {
        $scope.subToggle = !$scope.subToggle;
      }
      $scope.toggleSports = function() {
        $scope.subToggle = !$scope.subToggle;
        $scope.sports = true;
        $scope.accountMenu = false;
      };
      $scope.toggleAccount = function() {
        $scope.subToggle = !$scope.subToggle;
        $scope.sports = false;
        $scope.accountMenu = true;
      };
    });

})();
