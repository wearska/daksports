'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('TestCtrl', ['$scope', '$http', '$filter', 'productRes', function($scope, $http, $filter, productRes) {
        $scope.products = {};
        
        productRes.query().success(function(response) {
            $scope.products = response;
        });
        
        console.log($scope.products);
    }]);
