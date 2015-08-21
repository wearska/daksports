(function() {
  'use strict';

  angular.module('daksportsApp')
    .controller('CardCtrl', function($http, $rootScope, $scope, $mdDialog, $cookies, cart, ngCart, Auth) {

      // DUMMY CONTENT
      $scope.availableSizes = [
        'XS',
        'S',
        'M',
        'L',
        'XL',
        'XXl'
      ];
      $scope.selectedCount = 1;

      // SHOW ORDER FAB
      $scope.showOrderFab = false;
      $scope.toggleOrderFab = function() {
        $scope.showOrderFab = !$scope.showOrderFab;
      }
      $scope.expandedOrderFab = false;
      $scope.expandOrderFab = function() {
        $scope.expandedOrderFab = !$scope.expandedOrderFab;
      }

      // ORDER
      $scope.orderUp = false;
      $scope.toggleOrder = function() {
        $scope.orderUp = !$scope.orderUp;
      };

      // ADD TO CART
      $scope.inCart = false;
      $scope.addToCart = function(item) {
        console.log(item);
      }

      // ADD TO FAV
      $scope.postFav = function(productid) {
        var data = {
          userid: $rootScope.userData.id,
          productid: productid
        };
        $http.post('api/postuserfav.php', data)
          .then(function(response) {
            console.log(response)
          }).catch(function(error) {
            console.log(error);
          });
      }
    });

})();