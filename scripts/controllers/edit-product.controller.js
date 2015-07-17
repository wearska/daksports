'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:EditProductCtrl
 * @description
 * # EditProductCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('EditProductCtrl', ['$scope', '$http', '$filter', '$stateParams', 'FileUploader', '$interval', function($scope, $http, $filter, $stateParams, FileUploader, $interval) {

        var data = $stateParams.productId;

        console.log($stateParams.productId);

        // Initial state
        $scope.product = {};

        // Uploader options
        var uploader = $scope.uploader = new FileUploader({
            url: 'api/upload.php',
            queueLimit: 5,
            formData: [],
            removeAfterUpload: true
        });

        // Uploader filters

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });


        // Uploader methods

        uploader.onAfterAddingAll = function(addedFileItems) {
            // define product.files object based on
            console.log("added all");
            var a = -1,
                file = [],
                year = $filter('date')($scope.product.submissionDate, 'yy'),
                month = $filter('date')($scope.product.submissionDate, 'MM');
            angular.forEach(addedFileItems, function() {
                a++;
                var key = 'file' + (a + 1),
                    value = 'uploads/' + year + '/' + month + '/' + addedFileItems[a].file.name;
                value = value.replace(/\s+/g, '_');
                $scope.product.files[key] = value;
            });
        };
        uploader.onCompleteAll = function() {
            $scope.resetForm();
        };
        uploader.onBeforeUploadItem = function(item) {
            item.formData = [];
            uploader.formData = [{
                year: $filter('date')($scope.product.submissionDate, 'yy'),
                month: $filter('date')($scope.product.submissionDate, 'MM')
            }];
            Array.prototype.push.apply(item.formData, uploader.formData);
        };


        $http.get("api/get.php?id=" + data)
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

            $scope.updateProduct = function(product) {
                if ($scope.productForm.$valid) {
                    //console.log(product);
                    //make the call
                    var product = $scope.product;
                    var data = {
                        'name': product.name,
                        'subname': product.subname,
                        'price': product.price,
                        'inv': product.inv,
                        'excerpt': product.excerpt,
                        'desc': product.desc,
                        'file1': product.files.file1,
                        'file2': product.files.file2,
                        'file3': product.files.file3,
                        'file4': product.files.file4,
                        'file5': product.files.file5,
                        'added': product.submissionDate
                    }
                    if (!product.files.file1) {
                        $scope.resetForm();
                    }
                    $http.post("api/put.php?id=" + $stateParams.productId, data)
                        .success(function(data) {
                            console.log(data);
                    });
                    uploader.uploadAll();
                } else {
                    $scope.productForm.submitted = true;
                }
            }
    }]);
