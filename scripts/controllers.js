'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('IndexCtrl', function($scope, $location, productRes) {
        $scope.products = {};
        productRes.query().success(function(response) {
            $scope.products = response;
        });
    });