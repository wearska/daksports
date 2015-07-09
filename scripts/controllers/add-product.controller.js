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


        $scope.product = {
            submissionDate: new Date(),
            files: {}
        }
        console.log($scope.product);

        var uploader = $scope.uploader = new FileUploader({
            url: 'api/upload.php',
            queueLimit: 5,
            removeAfterUpload: true
        });

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        uploader.onBeforeUploadItem = function(item) {
            Array.prototype.push.apply(item.formData, uploader.formData);
        };

        // CALLBACKS

        // uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //     console.info('onWhenAddingFileFailed', item, filter, options);
        // };
        // uploader.onAfterAddingFile = function(fileItem) {
        //     console.info('onAfterAddingFile', fileItem);
        // };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            // console.info(addedFileItems[0]);
            var a = -1,
                file = [],
                year = $filter('date')($scope.product.submissionDate, 'yy'),
                month = $filter('date')($scope.product.submissionDate, 'MM');
            angular.forEach(addedFileItems, function() {
                a++;
                var key = 'file' + (a + 1),
                    value = year + '/' + month + '/' + addedFileItems[a].file.name;
                value = value.replace(/\s+/g, '_');
                $scope.product.files[key] = value;
            });
            //console.log($scope.product);
        };

        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };
        $scope.insertProduct = function(product) {
            if ($scope.productForm.$valid) {
                console.log(product);
                //make the call
                var product = $scope.product;
                var data = {
                        'name': product.name,
                        'subname': product.subName,
                        'price': product.price,
                        'excerpt': product.excerpt,
                        'desc': product.description,
                        'files': product.files
                    }
                    // $http.post("api/save.php", data)
                    //     .success(function(data) {
                    //         console.log("new product added");
                    // });

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