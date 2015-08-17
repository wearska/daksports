'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AddProductCtrl
 * @description
 * # AddProductCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AddProductCtrl', function($scope, $http, $filter, $parse, FileUploader, $interval) {

        var firstDone = false,
            secondDone = false,
            thirdDone = false,
            fourthDone = false,
            fifthDone = false;

        // Reset object
        var reset = {
            name: "",
            subname: "",
            price: null,
            promo: 0,
            promoPrice: null,
            promoStockCheck: 0,
            promoStock: 1,
            promoDateCheck: 0,
            promoDate: new Date(),
            inv: null,
            excerpt: "",
            desc: "",
            file1: "",
            file2: "",
            file3: "",
            file4: "",
            file5: "",
            submissionDate: new Date(),
        };

        // Temp object
        var tempreset = {
            photo1: '/uploads/placeholder.png',
            photo2: '/uploads/placeholder.png',
            photo3: '/uploads/placeholder.png',
            photo4: '/uploads/placeholder.png',
            photo5: '/uploads/placeholder.png'
        }

        // Initial state
        $scope.product = angular.copy(reset);
        $scope.temp = angular.copy(tempreset);

        //Reset form
        $scope.resetForm = function() {
            if (firstDone && secondDone && thirdDone && fourthDone && fifthDone) {
                // proper reset form
                $scope.product = angular.copy(reset);
                $scope.temp = angular.copy(tempreset);
                $scope.productForm.$setPristine();
                $scope.productForm.$setUntouched();
                console.log("form reset");
            } else {
                console.log("one of the uploaders hasnt finished uploading")
            }
        }

        // Uploaders
        var tempuploader = $scope.tempuploader = new FileUploader({
            url: 'api/uploadtemp.php',
            formData: []
        });
        var uploader1 = $scope.uploader1 = new FileUploader({
            url: 'api/uploadtest.php',
            //queueLimit : 1,
            // autoUpload: true,
            formData: []
        });
        var uploader2 = $scope.uploader2 = new FileUploader({
            url: 'api/uploadtest.php',
            //queueLimit : 1,
            // autoUpload: true,
            formData: []
        });
        var uploader3 = $scope.uploader3 = new FileUploader({
            url: 'api/uploadtest.php',
            //queueLimit : 1,
            // autoUpload: true,
            formData: []
        });
        var uploader4 = $scope.uploader4 = new FileUploader({
            url: 'api/uploadtest.php',
            //queueLimit : 1,
            // autoUpload: true,
            formData: []
        });
        var uploader5 = $scope.uploader5 = new FileUploader({
            url: 'api/uploadtest.php',
            //queueLimit : 1,
            // autoUpload: true,
            formData: []
        });


        // Uploader filters
        uploader1.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        uploader2.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        uploader3.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        uploader4.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        uploader5.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/ , options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });


        // Temp uploader methods
        tempuploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.log(fileItem.formData[0].uploader);
            var uploaderNo = fileItem.formData[0].uploader;
            var photoSrc = '/uploads/temp/' + fileItem.file.name;
            var str = 'temp.photo' + uploaderNo;
            var model = $parse(str);
            model.assign($scope, photoSrc);
            tempuploader.queue = [];
        };


        // Uploader1 methods
        uploader1.onAfterAddingFile = function(item) {
            var thisQueue = uploader1.queue[uploader1.queue.length - 1];
            tempuploader.queue.push(thisQueue);
            tempuploader.queue[0].url = 'api/uploadtemp.php';
            tempuploader.queue[0].formData = [{
                uploader: '1'
            }];
            tempuploader.uploadItem(0);
        };
        uploader1.onBeforeUploadItem = function(item) {
            item.formData = [];
            uploader1.formData = [{
                year: $filter('date')($scope.product.submissionDate, 'yy'),
                month: $filter('date')($scope.product.submissionDate, 'MM')
            }];
            uploader1.queue[uploader1.queue.length - 1].url = 'api/uploadtest.php';
            Array.prototype.push.apply(item.formData, uploader1.formData);
        };
        uploader1.onCompleteAll = function() {
            uploader1.clearQueue();
            firstDone = true;
            $scope.resetForm();
        };


        // Uploader2 methods
        uploader2.onAfterAddingFile = function(item) {
            var thisQueue = uploader2.queue[uploader2.queue.length - 1];
            tempuploader.queue.push(thisQueue);
            tempuploader.queue[0].url = 'api/uploadtemp.php';
            tempuploader.queue[0].formData = [{
                uploader: '2'
            }];
            tempuploader.uploadItem(0);
        };
        uploader2.onBeforeUploadItem = function(item) {
            item.formData = [];
            uploader2.formData = [{
                year: $filter('date')($scope.product.submissionDate, 'yy'),
                month: $filter('date')($scope.product.submissionDate, 'MM')
            }];
            uploader2.queue[uploader2.queue.length - 1].url = 'api/uploadtest.php';
            Array.prototype.push.apply(item.formData, uploader2.formData);
        };
        uploader2.onCompleteAll = function() {
            uploader2.clearQueue();
            secondDone = true;
            $scope.resetForm();
        };


        // Uploader3 methods
        uploader3.onAfterAddingFile = function(item) {
            var thisQueue = uploader3.queue[uploader3.queue.length - 1];
            tempuploader.queue.push(thisQueue);
            tempuploader.queue[0].url = 'api/uploadtemp.php';
            tempuploader.queue[0].formData = [{
                uploader: '3'
            }];
            tempuploader.uploadItem(0);
        };
        uploader3.onBeforeUploadItem = function(item) {
            item.formData = [];
            uploader3.formData = [{
                year: $filter('date')($scope.product.submissionDate, 'yy'),
                month: $filter('date')($scope.product.submissionDate, 'MM')
            }];
            uploader3.queue[uploader3.queue.length - 1].url = 'api/uploadtest.php';
            Array.prototype.push.apply(item.formData, uploader3.formData);
        };
        uploader3.onCompleteAll = function() {
            uploader3.clearQueue();
            thirdDone = true;
            $scope.resetForm();
        };


        // Uploader4 methods
        uploader4.onAfterAddingFile = function(item) {
            var thisQueue = uploader4.queue[uploader4.queue.length - 1];
            tempuploader.queue.push(thisQueue);
            tempuploader.queue[0].url = 'api/uploadtemp.php';
            tempuploader.queue[0].formData = [{
                uploader: '4'
            }];
            tempuploader.uploadItem(0);
        };
        uploader4.onBeforeUploadItem = function(item) {
            item.formData = [];
            uploader4.formData = [{
                year: $filter('date')($scope.product.submissionDate, 'yy'),
                month: $filter('date')($scope.product.submissionDate, 'MM')
            }];
            uploader4.queue[uploader4.queue.length - 1].url = 'api/uploadtest.php';
            Array.prototype.push.apply(item.formData, uploader4.formData);
        };
        uploader4.onCompleteAll = function() {
            uploader4.clearQueue();
            fourthDone = true;
            $scope.resetForm();
        };


        // Uploader5 methods
        uploader5.onAfterAddingFile = function(item) {
            var thisQueue = uploader5.queue[uploader5.queue.length - 1];
            tempuploader.queue.push(thisQueue);
            tempuploader.queue[0].url = 'api/uploadtemp.php';
            tempuploader.queue[0].formData = [{
                uploader: '5'
            }];
            tempuploader.uploadItem(0);
        };
        uploader5.onBeforeUploadItem = function(item) {
            item.formData = [];
            uploader5.formData = [{
                year: $filter('date')($scope.product.submissionDate, 'yy'),
                month: $filter('date')($scope.product.submissionDate, 'MM')
            }];
            uploader5.queue[uploader5.queue.length - 1].url = 'api/uploadtest.php';
            Array.prototype.push.apply(item.formData, uploader5.formData);
        };
        uploader5.onCompleteAll = function() {
            uploader5.clearQueue();
            fifthDone = true;
            $scope.resetForm();
        };

        $scope.upload = function() {
            if (uploader1.queue.length) {
                uploader1.uploadItem(uploader1.queue.length - 1);
            }
            if (uploader2.queue.length) {
                uploader2.uploadItem(uploader2.queue.length - 1);
            }
            if (uploader3.queue.length) {
                uploader3.uploadItem(uploader3.queue.length - 1);
            }
            if (uploader4.queue.length) {
                uploader4.uploadItem(uploader4.queue.length - 1);
            }
            if (uploader5.queue.length) {
                uploader5.uploadItem(uploader5.queue.length - 1);
            }
        }

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
                $scope.upload();
            } else {
                $scope.productForm.submitted = true;
            }
        }
    });