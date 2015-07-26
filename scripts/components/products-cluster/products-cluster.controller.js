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
        $scope.xsitems = '2';
        $scope.sitems = '3';
        $scope.mitems = '4';
        $scope.litems = '5';

        productRes.query().success(function(response) {
            $scope.products = response;
        });
    });
