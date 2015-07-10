'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
  .controller('MainCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
            console.log($location.$$absUrl);
  }]);
