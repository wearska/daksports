'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('TestCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.product = {
            submissionDate: new Date()
        }
        $scope.insertProduct = function(product) {
            if ($scope.productForm.$valid) {
                console.log(product);
            } else {
                $scope.productForm.submitted = true;
            }
        }
    }]);