'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AddProductCtrl
 * @description
 * # AddProductCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AddProductCtrl', ['$scope', '$http', '$filter', 'FileUploader', '$interval', function($scope, $http, $filter, FileUploader, $interval) {

        // Test object
        var test = {
            submissionDate: new Date(),
            name: "Pantofi sport",
            subname: "Adidas ZX-75",
            price: 368.99,
            inv: 23,
            excerpt: "Lorem ipsum",
            desc: "Lorem ipsum dolor sit amet",
            files: {
                file1 : "",
                file2 : "",
                file3 : "",
                file4 : "",
                file5 : ""
            }
        };

        // Reset object
        var reset = {
            submissionDate: new Date(),
            name: "",
            subname: "",
            price: null,
            inv: null,
            excerpt: "",
            desc: "",
            files: {
                file1 : "",
                file2 : "",
                file3 : "",
                file4 : "",
                file5 : ""
            }
        };

        // Initial state
        $scope.product = angular.copy(reset);

        //Reset form
        $scope.resetForm = function() {
            // proper reset form
            $scope.product = angular.copy(reset);
            $scope.productForm.$setPristine();
            $scope.productForm.$setUntouched();
            console.log("form reset");
        }

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

        $scope.insertProduct = function(product) {
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
                $http.post("api/post.php", data)
                    .success(function(data) {
                        console.log("new product added");
                });
                uploader.uploadAll();
            } else {
                $scope.productForm.submitted = true;
            }
        }
    }]);
