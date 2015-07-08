'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AddProductCtrl
 * @description
 * # AddProductCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AddProductCtrl', ['$scope', '$http', 'FileUploader', '$interval', function($scope, $http, FileUploader, $interval) {


        $scope.product = {
            submissionDate: new Date(),
            files: null
        }

        var uploader = $scope.uploader = new FileUploader({
            url: 'api/upload.php',
            queueLimit: 50,
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

        // CALLBACKS

        // uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        //     console.info('onWhenAddingFileFailed', item, filter, options);
        // };
        // uploader.onAfterAddingFile = function(fileItem) {
        //     console.info('onAfterAddingFile', fileItem);
        // };
        uploader.onAfterAddingAll = function(addedFileItems) {
            // console.info(addedFileItems[0]);
            var a = -1;
            var files = []
            angular.forEach(addedFileItems, function() {
                a++;
                // console.info(addedFileItems[a].file.name);
                files.push('file' + a + ' : ' + addedFileItems[a].file.name);
                // console.log(files);
            });
            $scope.product.files = files;
        };
        // uploader.onBeforeUploadItem = function(item) {
        //     console.info('onBeforeUploadItem', item);
        // };
        // uploader.onProgressItem = function(fileItem, progress) {
        //     console.info('onProgressItem', fileItem, progress);
        // };
        // uploader.onProgressAll = function(progress) {
        //     console.info('onProgressAll', progress);
        // };
        // uploader.onSuccessItem = function(fileItem, response, status, headers) {
        //     console.info('onSuccessItem', fileItem, response, status, headers);
        // };
        // uploader.onErrorItem = function(fileItem, response, status, headers) {
        //     console.info('onErrorItem', fileItem, response, status, headers);
        // };
        // uploader.onCancelItem = function(fileItem, response, status, headers) {
        //     console.info('onCancelItem', fileItem, response, status, headers);
        // };
        // uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //     console.info('onCompleteItem', fileItem, response, status, headers);
        // };
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