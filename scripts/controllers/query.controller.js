'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:queryCtrl
 * @description
 * # queryCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
  .controller('queryCtrl', function ($scope, $http) {
      $http.get("api/query.php")
    .success(function (response) {$scope.names = response.records;});
  });
