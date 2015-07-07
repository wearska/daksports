'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AddProductCtrl
 * @description
 * # AddProductCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AddProductCtrl', ['$scope', '$http', '$timeout', '$upload', function($scope, $http, $timeout, $upload) {

        $scope.product = {
            submissionDate: new Date(),
            files: null
        }
        $scope.insertProduct = function(product) {
            if ($scope.productForm.$valid) {
                //console.log(product);
                //make the call
                var product = $scope.product;
                var data = {
                        'name': product.name,
                        'subname': product.subName,
                        'price': product.price,
                        'excerpt': product.excerpt,
                        'desc': product.description,
                        'img1': product.files.file1,
                        'img2': product.files.file2,
                        'img3': product.files.file3,
                        'img4': product.files.file4,
                        'img5': product.files.file5
                    }
                    // $http.post("api/save.php", data)
                    //     .success(function(data) {
                    //         console.log("new product added");
                    // });
                // $http.post("api/upload.php", data)
                //     .success(function(data) {
                //         console.log("file uploading");
                //     });

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
        $scope.uploadResult = [];
        $scope.onFileSelect = function($files) {
            for (var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                $upload.upload({
                    url: 'upload.php',
                    file: $file,
                    progress: function(e) {}
                }).then(function(response) {
                    $timeout(function() {
                        $scope.uploadResult.push(response.data);
                    });
                });
            }
        }
    }]);
