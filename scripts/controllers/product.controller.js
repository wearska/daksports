'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('ProductCtrl', function($scope, $http, $filter,$stateParams, productRes) {
        // Initial state
        $scope.product = {};
        $scope.files = {};
        
        $scope.isFav = function(){
            var bool = true;
            return bool;
        }

        productRes.get($stateParams.productId)
            .success(function(response) {
                var reset = {
                    submissionDate: new Date(response[0].added),
                    name: response[0].name,
                    subname: response[0].subname,
                    price: parseFloat(response[0].price),
                    inv: parseFloat(response[0].inv),
                    excerpt: response[0].excerpt,
                    desc: response[0].description,
                    file1: response[0].file1,
                    file2: response[0].file2,
                    file3: response[0].file3,
                    file4: response[0].file4,
                    file5: response[0].file5
                };
                $scope.product = angular.copy(reset);
                $scope.files = {
                    file1: response[0].file1,
                    file2: response[0].file2,
                    file3: response[0].file3,
                    file4: response[0].file4,
                    file5: response[0].file5
                };
            console.log($scope.files)
            });
    })