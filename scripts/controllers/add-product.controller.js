'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AddProductCtrl
 * @description
 * # AddProductCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AddProductCtrl', ['$scope', '$http', function($scope, $http) {

        $scope.product = {
            submissionDate: new Date(),
            files: null
        }
        $scope.insertProduct = function(product) {
            if ($scope.productForm.$valid) {
                console.log(product);
                
                // proper reset form
                $scope.product = {
                    submissionDate: new Date()
                }
                $scope.productForm.$setPristine();
                $scope.productForm.$setUntouched();
            } else {
                $scope.productForm.submitted = true;
            }
        }
    }]);