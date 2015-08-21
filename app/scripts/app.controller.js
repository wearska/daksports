(function() {
  'use strict';

  angular
    .module('daksportsApp')
    .controller('AppCtrl', function($http, $rootScope, $scope, $filter, $location, productRes, Auth) {
      // Products
      $scope.products = {};

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

      Auth.$onAuth(function(authData) {
        if (authData) {
          // get user stored data
          $http.get('api/accounts/getuserdata.php?email=' + authData.password.email)
            .then(function(response) {
              $scope.userData = response.data;
              $rootScope.userData = response.data;
              getFavs(response.data.id);
            }).catch(function(error) {
              $scope.userData = {};
              $rootScope.userData = {};
              return error;
            });
          $scope.logged = true;
          $rootScope.logged = true;
        } else {
          $scope.userData = {};
          $rootScope.userData = {};
          $scope.logged = false;
          $rootScope.logged = false;
        }
      });

      $scope.logout = function() {
        Auth.$unauth();
        $location.path('/');
      };
    });

})();
