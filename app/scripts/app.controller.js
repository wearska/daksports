(function() {
  'use strict';

  angular
    .module('daksportsApp')
    .controller('AppCtrl', function($http, $rootScope, $scope, $filter, $location, productRes, Auth) {
      // Products
      $scope.products = {};
      $rootScope.noNav = false;

      function setFavourite(id) {
        var product = $filter('filter')($scope.products, function(d) {
          return d.id === id;
        })[0];
        product.favourite = true;
      }

      function getProducts() {
        productRes.query().success(function(response) {
          $scope.products = response;
          $rootScope.products = response;
          angular.forEach($scope.userData.favourites, function(value, key) {
            setFavourite(value);
          });
        });
      }

      // Authentication
      $scope.userData = {};
      $scope.logged = false;

      // User data
      //get user stored favourites

      function getFavs(userid) {
        $http.get('api/getuserfav.php?userid=' + userid)
          .then(function(response) {
            $scope.userData.favourites = response.data;
            $rootScope.userData.favourites = response.data;
            getProducts();
          }).catch(function(error) {
            $scope.userData.favourites = {};
            $rootScope.userData.favourites = {};
            return error;
          });
      }

      $scope.logout = function() {
        Auth.$unauth();
        $location.path('/');
      };
    });

})();
