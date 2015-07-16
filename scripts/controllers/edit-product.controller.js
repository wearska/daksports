'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:EditProductCtrl
 * @description
 * # EditProductCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('EditProductCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
        
        var data = 3;
        
        // Initial state
        $scope.product = {};

        $http.get("api/get.php?id=" + data + "")
            .success(function(response) {
                $scope.products = response[0];
                // Reset object
                var reset = {
                    submissionDate: new Date(response[0].added),
                    name: response[0].name,
                    subname: response[0].subname,
                    price: parseFloat(response[0].price),
                    inv: parseFloat(response[0].inv),
                    excerpt: response[0].excerpt,
                    desc: response[0].description,
                    files: {
                        file1 : response[0].file1,
                        file2 : response[0].file2,
                        file3 : response[0].file3,
                        file4 : response[0].file4,
                        file5 : response[0].file5
                    }
                };
                $scope.product = angular.copy(reset);
            });

    }]);