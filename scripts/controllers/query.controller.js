'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:QueryCtrl
 * @description
 * # QueryCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
  .controller('QueryCtrl', function ($scope, $http) {
      $http.get("api/query.php")
    .success(function (response) {$scope.names = response.records;});
  });
