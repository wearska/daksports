(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AddCtrl', function($rootScope, $scope, $http, $filter, $parse, FileUploader, $interval, productRes) {

            var firstDone = false,
                secondDone = false,
                thirdDone = false,
                fourthDone = false,
                fifthDone = false;

            // Reset object
            var reset = {
                code:" ",
                name: "",
                subname: "",
                slug: "",
                price: 0,
                inv: 0,
                promo: 0,
                promo_price: 0,
                promo_stock: 0,
                promo_end: null,
                excerpt: "",
                description: "",
                brand: "",
                type: "",
                kind: "",
                tags: [],
                age: 0,
                gender: 0,
                colours: [],
                file1: "uploads/placeholder.png",
                file2: "uploads/placeholder.png",
                file3: "uploads/placeholder.png",
                file4: "uploads/placeholder.png",
                file5: "uploads/placeholder.png",
                added: new Date(),
                favourite: "",
                published: 1
            };

            // Temp object
            var tempreset = {
                photo1: 'uploads/placeholder.png',
                photo2: 'uploads/placeholder.png',
                photo3: 'uploads/placeholder.png',
                photo4: 'uploads/placeholder.png',
                photo5: 'uploads/placeholder.png'
            }

            // Initial state

            $scope.product = angular.copy(reset);
            $scope.temp = angular.copy(tempreset);
            $scope.buttonTitle = "Adauga Produs";
            $scope.productForm = {};
            $scope.renameId = "";
            $scope.state = "add";
            $scope.$on('$destroy', function() {
                $scope.state = null;
            });

            function rename(file) {
                var n = file.lastIndexOf('/');
                return [file.slice(0, n + 1), $scope.renameId + '/', file.slice(n + 1)].join('');
            }

            $scope.setShort = function(ev){
                var typeSt = $scope.product.type;
                angular.forEach($rootScope.types, function(type){
                    if(typeSt.indexOf(type.type) > -1){
                        console.log(type.short);
                        var series = $filter('serialize')(type.short);
                        $scope.product.code = series;
                    }
                });
            }

            $scope.setFiles = function() {
                var putData = angular.copy($scope.postData);
                putData.id = $scope.renameId;
                putData.file1 = rename(putData.file1);
                putData.file2 = rename(putData.file2);
                putData.file3 = rename(putData.file3);
                putData.file4 = rename(putData.file4);
                putData.file5 = rename(putData.file5);
                productRes.put(putData);
                console.log(putData);
            }

            // Update Categories and brands
            String.prototype.toProperCase = function() {
                return this.replace(/\w\S*/g, function(txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            };


            function brandsCheck(brand) {
                var bool = false;
                angular.forEach($rootScope.brands, function(value, key) {
                    brand = angular.lowercase(brand);
                    value = angular.lowercase(value);
                    if (brand.indexOf(value) != -1) {
                        bool = true;
                        return false;
                    } else {
                        return true;
                    }
                });
                return bool;
            }

            function subCatsCheck(cat) {
                var bool = false;
                angular.forEach($rootScope.kinds, function(value, key) {
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

            function mainCatsCheck(cat) {
                var bool = false;
                angular.forEach($rootScope.types, function(value, key) {
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
                // update brands
                $scope.product.brand = $scope.product.brand.toProperCase();
                var brand = $scope.product.brand;
                console.log(brand);
                if (!brandsCheck($scope.product.brand)) {
                    var data = {
                        brand: brand
                    };
                    $http.post("api/categories/post.brands.php", data);
                    $rootScope.brands.push(brand);
                } else {
                    //do nothing yet
                };

                // update kinds
                $scope.product.kind = $scope.product.kind.toProperCase();
                var cat = $scope.product.kind;
                console.log(cat);
                if (!subCatsCheck($scope.product.kind)) {
                    var data = {
                        kind: cat
                    };
                    $http.post("api/categories/post.kinds.php", data);
                    $rootScope.kinds.push(cat);
                } else {
                    //do nothing yet
                };

                // update main cats
                $scope.product.type = $scope.product.type.toProperCase();
                var cat = $scope.product.type;
                console.log(cat);
                if (!mainCatsCheck($scope.product.type)) {
                    var data = {
                        type: cat
                    };
                    $http.post("api/categories/post.types.php", data);
                    $rootScope.types.push(cat);
                } else {
                    //do nothing yet
                };
            }

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
                var year = $filter('date')($scope.product.added, 'yy'),
                    month = $filter('date')($scope.product.added, 'MM'),
                    filename = uploader1.queue[uploader1.queue.length - 1].file.name,
                    value = 'uploads/' + year + '/' + month + '/' + filename;
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
                var year = $filter('date')($scope.product.added, 'yy'),
                    month = $filter('date')($scope.product.added, 'MM'),
                    filename = uploader2.queue[uploader2.queue.length - 1].file.name,
                    value = 'uploads/' + year + '/' + month + '/' + filename;
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
                secondDone = true;
                $scope.resetForm();
            };
            uploader2.clearThumb = function() {
                console.log("thumb cleared");
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
                var year = $filter('date')($scope.product.added, 'yy'),
                    month = $filter('date')($scope.product.added, 'MM'),
                    filename = uploader3.queue[uploader3.queue.length - 1].file.name,
                    value = 'uploads/' + year + '/' + month + '/' + filename;
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
                thirdDone = true;
                $scope.resetForm();
            };
            uploader3.clearThumb = function() {
                console.log("thumb cleared");
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
                var year = $filter('date')($scope.product.added, 'yy'),
                    month = $filter('date')($scope.product.added, 'MM'),
                    filename = uploader4.queue[uploader4.queue.length - 1].file.name,
                    value = 'uploads/' + year + '/' + month + '/' + filename;
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
                fourthDone = true;
                $scope.resetForm();
            };
            uploader4.clearThumb = function() {
                console.log("thumb cleared");
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
                var year = $filter('date')($scope.product.added, 'yy'),
                    month = $filter('date')($scope.product.added, 'MM'),
                    filename = uploader5.queue[uploader5.queue.length - 1].file.name,
                    value = 'uploads/' + year + '/' + month + '/' + filename;
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
                fifthDone = true;
                $scope.resetForm();
            };
            uploader5.clearThumb = function() {
                console.log("thumb cleared");
                $scope.temp.photo5 = 'uploads/placeholder.png';
                $scope.product.file5 = 'uploads/placeholder.png';
            };

            $scope.upload = function() {
                if (uploader1.queue.length) {
                    uploader1.uploadItem(uploader1.queue.length - 1);
                } else {
                    firstDone = true;
                    $scope.resetForm();
                }
                if (uploader2.queue.length) {
                    uploader2.uploadItem(uploader2.queue.length - 1);
                } else {
                    secondDone = true;
                    $scope.resetForm();
                }
                if (uploader3.queue.length) {
                    uploader3.uploadItem(uploader3.queue.length - 1);
                } else {
                    thirdDone = true;
                    $scope.resetForm();
                }
                if (uploader4.queue.length) {
                    uploader4.uploadItem(uploader4.queue.length - 1);
                } else {
                    fourthDone = true;
                    $scope.resetForm();
                }
                if (uploader5.queue.length) {
                    uploader5.uploadItem(uploader5.queue.length - 1);
                } else {
                    fifthDone = true;
                    $scope.resetForm();
                }
            };

            $scope.postData = {};
            $scope.submitProduct = function(product) {
                    if ($scope.productForm.$valid) {
                        catsUpdate();
                        $scope.postData = angular.copy($scope.product);
                        $scope.postData.tags = $scope.postData.tags.join(", ");
                        $scope.postData.colours = $scope.postData.colours.join(", ");
                        // make the call
                        productRes.post($scope.postData)
                            .then(function(response) {
                                $scope.renameId = response.data;
                                product.id = response.data;
                                $scope.setFiles();
                                $scope.upload();
                            }).catch(function(error) {
                                return error;
                            });
                    } else {
                        $scope.productForm.submitted = true;
                    }
                }
                // $scope.submitProduct = function(product){
                //     var timestamp = product.added.getTime();
                //     console.log(timestamp);
                // }
        });

})();
