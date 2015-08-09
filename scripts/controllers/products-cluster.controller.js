'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:ProductsClusterCtrl
 * @description
 * # ProductsClusterCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('ProductsClusterCtrl', function($scope, $http, $filter, productRes, auth) {
        $scope.products = {};
        productRes.query().success(function(response) {
            $scope.products = response;
        });
    });
