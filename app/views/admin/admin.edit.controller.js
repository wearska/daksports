(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('EditCtrl', function($scope, $rootScope, $http, $filter, $parse, $location, $stateParams, FileUploader, $interval, productRes) {

            var firstChanged = false,
                secondChanged = false,
                thirdChanged = false,
                fourthChanged = false,
                fifthChanged = false;
            // Initial state
            $scope.product = {};
            $scope.productForm = {};
            $scope.ready = false;
            $scope.buttonTitle = "Editeaza Produs";

            function setTypes() {
                $scope.product.added = new Date($scope.product.added);
                // (angular.isDate($scope.product.promo_end)) ? $scope.product.promo_end = new Date($scope.product.promo_end) : $scope.product.promo_end = undefined;
                $scope.product.inv = parseFloat($scope.product.inv);
                $scope.product.price = parseFloat($scope.product.price);
                $scope.product.promo = parseFloat($scope.product.promo);
                $scope.product.published = parseFloat($scope.product.published);
                $scope.product.promo_price = parseFloat($scope.product.promo_price);
                if ($scope.product.promo && $scope.product.promo_price) {
                    console.log("promo");
                    $scope.product.old_price = $scope.product.price;
                    $scope.product.new_price = $scope.product.promo_price;
                }else{
                    $scope.product.old_price = 0;
                    $scope.product.new_price = $scope.product.price;
                };
                $scope.product.promo_stock = parseFloat($scope.product.promo_stock);
                ($scope.product.tags) ? $scope.product.tags = $scope.product.tags.split(', '): $scope.product.tags = [];
                ($scope.product.colours) ? $scope.product.colours = $scope.product.colours.split(', '): $scope.product.colours = [];
                // var year = $filter('date')($scope.product.promo_end, 'yy');
                // var bool = angular.isDate($scope.product.promo_end);
                // angular.equals(o1, o2);
                // console.log(bool);
                // (angular.isDate($scope.product.promo_end)) ? $scope.product.promo_end = new Date($scope.product.promo_end): $scope.product.promo_end = $scope.product.promo_end;
                $scope.ready = true;
            }

            String.prototype.toProperCase = function() {
                return this.replace(/\w\S*/g, function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            };


            function catsCheck(cat) {
                var bool = false;
                angular.forEach($rootScope.sub_cats, function(value, key) {
                    cat = angular.lowercase(cat);
                    value = angular.lowercase(value);
                    if (cat.indexOf(value) != -1) {
                        bool = true;
                        return false;
                    } else {
                        return true;
                    }
                });
                return bool;
            }

            function catsUpdate() {
                $scope.product.sub_cat = $scope.product.sub_cat.toProperCase();
                var cat = $scope.product.sub_cat;
                console.log(cat);
                if (!catsCheck($scope.product.sub_cat)) {
                    var data = {
                        sub_cat: cat
                    };
                    $http.post("api/categories/post.sub_cats.php", data);
                    $rootScope.sub_cats.push(cat);
                } else {
                    //do nothing yet
                };
            }


            productRes.get($stateParams.productId)
                .then(function(response) {
                    $scope.product = response.data[0];
                    ($scope.product.promo_stock != 0) ? $scope.product.promoStockCheck = 1: $scope.product.promoStockCheck = 0;
                    var notDate = angular.equals($scope.product.promo_end, '0000-00-00 00:00:00');
                    console.log(notDate);
                    if(notDate){
                        $scope.product.promoDateCheck = 0;
                        $scope.product.promo_end = null;
                    }else{
                        $scope.product.promoDateCheck = 1;
                        $scope.product.promo_end = new Date($scope.product.promo_end);
                    };
                    setTypes();

                    // Set uploader images
                    var tempreset = {
                        photo1: response.data[0].file1,
                        photo2: response.data[0].file2,
                        photo3: response.data[0].file3,
                        photo4: response.data[0].file4,
                        photo5: response.data[0].file5
                    };
                    angular.forEach(tempreset, function(value, key) {
                        var str = 'temp.' + key;
                        var model = $parse(str);
                        model.assign($scope, value);
                    });
                }).catch(function(error) {
                    return error;
                });

            // Uploaders
            var tempuploader = $scope.tempuploader = new FileUploader({
                url: 'api/products/uploadtemp.php',
                formData: []
            });
            var uploader1 = $scope.uploader1 = new FileUploader({
                url: 'api/products/upload.php',
                //queueLimit : 1,
                // autoUpload: true,
                formData: []
            });
            var uploader2 = $scope.uploader2 = new FileUploader({
                url: 'api/products/upload.php',
                //queueLimit : 1,
                // autoUpload: true,
                formData: []
            });
            var uploader3 = $scope.uploader3 = new FileUploader({
                url: 'api/products/upload.php',
                //queueLimit : 1,
                // autoUpload: true,
                formData: []
            });
            var uploader4 = $scope.uploader4 = new FileUploader({
                url: 'api/products/upload.php',
                //queueLimit : 1,
                // autoUpload: true,
                formData: []
            });
            var uploader5 = $scope.uploader5 = new FileUploader({
                url: 'api/products/upload.php',
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
                var photoSrc = 'uploads/temp/' + fileItem.file.name;
                photoSrc = photoSrc.replace(/\s+/g, '_');
                var str = 'temp.photo' + uploaderNo;
                var model = $parse(str);
                model.assign($scope, photoSrc);
                tempuploader.queue = [];
            };


            // Uploader1 methods
            uploader1.onAfterAddingFile = function(item) {
                var thisQueue = uploader1.queue[uploader1.queue.length - 1];
                tempuploader.queue.push(thisQueue);
                tempuploader.queue[0].url = 'api/products/uploadtemp.php';
                tempuploader.queue[0].formData = [{
                    uploader: '1'
                }];
                tempuploader.uploadItem(0);
                firstChanged = true;
                var year = $filter('date')($scope.product.added, 'yy'),
                    month = $filter('date')($scope.product.added, 'MM'),
                    filename = uploader1.queue[uploader1.queue.length - 1].file.name,
                    value = 'uploads/' + year + '/' + month + '/' + $scope.product.id + '/' + filename;
                value = value.replace(/\s+/g, '_');
                $scope.product.file1 = value;
            };
            uploader1.onBeforeUploadItem = function(item) {
                item.formData = [];
                uploader1.formData = [{
                    year: $filter('date')($scope.product.added, 'yy'),
                    month: $filter('date')($scope.product.added, 'MM'),
                    id: $scope.product.id
                }];
                uploader1.queue[uploader1.queue.length - 1].url = 'api/products/upload.php';
                Array.prototype.push.apply(item.formData, uploader1.formData);
            };
            uploader1.onCompleteAll = function() {
                uploader1.clearQueue();
                firstDone = true;
                $scope.resetForm();
            };
            uploader1.clearThumb = function() {
                console.log("thumb cleared");
                tempuploader.clearQueue();
                $scope.temp.photo1 = 'uploads/placeholder.png';
                $scope.product.file1 = 'uploads/placeholder.png';
            };


            // Uploader2 methods
            uploader2.onAfterAddingFile = function(item) {
                var thisQueue = uploader2.queue[uploader2.queue.length - 1];
                tempuploader.queue.push(thisQueue);
                tempuploader.queue[0].url = 'api/products/uploadtemp.php';
                tempuploader.queue[0].formData = [{
                    uploader: '2'
                }];
                tempuploader.uploadItem(0);
                secondChanged = true;
                var year = $filter('date')($scope.product.added, 'yy'),
                    month = $filter('date')($scope.product.added, 'MM'),
                    filename = uploader2.queue[uploader2.queue.length - 1].file.name,
                    value = 'uploads/' + year + '/' + month + '/' + $scope.product.id + '/' + filename;
                value = value.replace(/\s+/g, '_');
                $scope.product.file2 = value;
            };
            uploader2.onBeforeUploadItem = function(item) {
                item.formData = [];
                uploader2.formData = [{
                    year: $filter('date')($scope.product.added, 'yy'),
                    month: $filter('date')($scope.product.added, 'MM'),
                    id: $scope.product.id
                }];
                uploader2.queue[uploader2.queue.length - 1].url = 'api/products/upload.php';
                Array.prototype.push.apply(item.formData, uploader2.formData);
            };
            uploader2.onCompleteAll = function() {
                uploader2.clearQueue();
                firstDone = true;
                $scope.resetForm();
            };
            uploader2.clearThumb = function() {
                console.log("thumb cleared");
                tempuploader.clearQueue();
                $scope.temp.photo2 = 'uploads/placeholder.png';
                $scope.product.file2 = 'uploads/placeholder.png';
            };


            // Uploader3 methods
            uploader3.onAfterAddingFile = function(item) {
                var thisQueue = uploader3.queue[uploader3.queue.length - 1];
                tempuploader.queue.push(thisQueue);
                tempuploader.queue[0].url = 'api/products/uploadtemp.php';
                tempuploader.queue[0].formData = [{
                    uploader: '3'
                }];
                tempuploader.uploadItem(0);
                thirdChanged = true;
                var year = $filter('date')($scope.product.added, 'yy'),
                    month = $filter('date')($scope.product.added, 'MM'),
                    filename = uploader3.queue[uploader3.queue.length - 1].file.name,
                    value = 'uploads/' + year + '/' + month + '/' + $scope.product.id + '/' + filename;
                value = value.replace(/\s+/g, '_');
                $scope.product.file3 = value;
            };
            uploader3.onBeforeUploadItem = function(item) {
                item.formData = [];
                uploader3.formData = [{
                    year: $filter('date')($scope.product.added, 'yy'),
                    month: $filter('date')($scope.product.added, 'MM'),
                    id: $scope.product.id
                }];
                uploader3.queue[uploader3.queue.length - 1].url = 'api/products/upload.php';
                Array.prototype.push.apply(item.formData, uploader3.formData);
            };
            uploader3.onCompleteAll = function() {
                uploader3.clearQueue();
                firstDone = true;
                $scope.resetForm();
            };
            uploader3.clearThumb = function() {
                console.log("thumb cleared");
                tempuploader.clearQueue();
                $scope.temp.photo3 = 'uploads/placeholder.png';
                $scope.product.file3 = 'uploads/placeholder.png';
            };


            // Uploader4 methods
            uploader4.onAfterAddingFile = function(item) {
                var thisQueue = uploader4.queue[uploader4.queue.length - 1];
                tempuploader.queue.push(thisQueue);
                tempuploader.queue[0].url = 'api/products/uploadtemp.php';
                tempuploader.queue[0].formData = [{
                    uploader: '4'
                }];
                tempuploader.uploadItem(0);
                fourthChanged = true;
                var year = $filter('date')($scope.product.added, 'yy'),
                    month = $filter('date')($scope.product.added, 'MM'),
                    filename = uploader4.queue[uploader4.queue.length - 1].file.name,
                    value = 'uploads/' + year + '/' + month + '/' + $scope.product.id + '/' + filename;
                value = value.replace(/\s+/g, '_');
                $scope.product.file4 = value;
            };
            uploader4.onBeforeUploadItem = function(item) {
                item.formData = [];
                uploader4.formData = [{
                    year: $filter('date')($scope.product.added, 'yy'),
                    month: $filter('date')($scope.product.added, 'MM'),
                    id: $scope.product.id
                }];
                uploader4.queue[uploader4.queue.length - 1].url = 'api/products/upload.php';
                Array.prototype.push.apply(item.formData, uploader4.formData);
            };
            uploader4.onCompleteAll = function() {
                uploader4.clearQueue();
                firstDone = true;
                $scope.resetForm();
            };
            uploader4.clearThumb = function() {
                console.log("thumb cleared");
                tempuploader.clearQueue();
                $scope.temp.photo4 = 'uploads/placeholder.png';
                $scope.product.file4 = 'uploads/placeholder.png';
            };


            // Uploader5 methods
            uploader5.onAfterAddingFile = function(item) {
                var thisQueue = uploader5.queue[uploader5.queue.length - 1];
                tempuploader.queue.push(thisQueue);
                tempuploader.queue[0].url = 'api/products/uploadtemp.php';
                tempuploader.queue[0].formData = [{
                    uploader: '5'
                }];
                tempuploader.uploadItem(0);
                fifthChanged = true;
                var year = $filter('date')($scope.product.added, 'yy'),
                    month = $filter('date')($scope.product.added, 'MM'),
                    filename = uploader5.queue[uploader5.queue.length - 1].file.name,
                    value = 'uploads/' + year + '/' + month + '/' + $scope.product.id + '/' + filename;
                value = value.replace(/\s+/g, '_');
                $scope.product.file5 = value;
            };
            uploader5.onBeforeUploadItem = function(item) {
                item.formData = [];
                uploader5.formData = [{
                    year: $filter('date')($scope.product.added, 'yy'),
                    month: $filter('date')($scope.product.added, 'MM'),
                    id: $scope.product.id
                }];
                uploader5.queue[uploader5.queue.length - 1].url = 'api/products/upload.php';
                Array.prototype.push.apply(item.formData, uploader5.formData);
            };
            uploader5.onCompleteAll = function() {
                uploader5.clearQueue();
                firstDone = true;
                $scope.resetForm();
            };
            uploader5.clearThumb = function() {
                console.log("thumb cleared");
                tempuploader.clearQueue();
                $scope.temp.photo5 = 'uploads/placeholder.png';
                $scope.product.file5 = 'uploads/placeholder.png';
            };

            $scope.upload = function() {
                if (uploader1.queue.length && firstChanged) {
                    uploader1.uploadItem(uploader1.queue.length - 1);
                } else {
                    firstChanged = true;
                }
                if (uploader2.queue.length && secondChanged) {
                    uploader2.uploadItem(uploader2.queue.length - 1);
                } else {
                    secondChanged = true;
                }
                if (uploader3.queue.length && thirdChanged) {
                    uploader3.uploadItem(uploader3.queue.length - 1);
                } else {
                    thirdChanged = true;
                }
                if (uploader4.queue.length && fourthChanged) {
                    uploader4.uploadItem(uploader4.queue.length - 1);
                } else {
                    fourthChanged = true;
                }
                if (uploader5.queue.length && fifthChanged) {
                    uploader5.uploadItem(uploader5.queue.length - 1);
                } else {
                    fifthChanged = true;
                }
            };

            $scope.putData = {};
            $scope.submitProduct = function(product) {
                if ($scope.productForm.$valid) {
                    catsUpdate();
                    $scope.putData = angular.copy($scope.product);
                    $scope.putData.tags = $scope.putData.tags.join(", ");
                    $scope.putData.colours = $scope.putData.colours.join(", ");
                    //make the call
                    productRes.put($scope.putData)
                        .then(function(response) {
                            $scope.upload();
                            $location.path('/admin/list');
                        }).catch(function(error) {
                            return error;
                        });
                } else {
                    $scope.productForm.submitted = true;
                }
            };
        });

})();
