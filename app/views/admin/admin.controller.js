(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AdminCtrl', function($scope, $rootScope, $timeout, $q, $log, productRes, FileUploader) {

            // VARIABLES

            // uploaders state
            var firstDone = false,
                secondDone = false,
                thirdDone = false,
                fourthDone = false,
                fifthDone = false;

            // Reset object
            var reset = {
                code: " ",
                name: "",
                subname: "",
                slug: "",
                price: 0,
                sizes: [{
                    name: "",
                    count: 0
                }],
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
                colour: '',
                file1: "uploads/placeholder.png",
                file2: "uploads/placeholder.png",
                file3: "uploads/placeholder.png",
                file4: "uploads/placeholder.png",
                file5: "uploads/placeholder.png",
                added: new Date(),
                published: 1
            };

            // Temp reset object
            var tempreset = {
                photo1: 'uploads/placeholder.png',
                photo2: 'uploads/placeholder.png',
                photo3: 'uploads/placeholder.png',
                photo4: 'uploads/placeholder.png',
                photo5: 'uploads/placeholder.png'
            }


            //hide the nvigation menu
            $rootScope.noNav = true;
            $scope.$on('$destroy', function() {
                $rootScope.noNav = false;
            });
            $scope.state = null;
            $scope.ready = false;


            // Initial state
            $scope.product = angular.copy(reset);
            $scope.temp = angular.copy(tempreset);
            $scope.productForm = {};
            $scope.renameId = "";

            // Sizes
            $scope.addMoreSizes = function() {
                var sizes = $scope.product.sizes;
                var newSize = {
                    name: "",
                    count: 0
                }
                sizes.push(newSize);
            }

            $scope.checkSizeExists = function(name) {
                var sizes = $scope.product.sizes;
                angular.forEach($scope.product.sizes, function(size) {
                    var idx = size.name.indexOf(name);
                    if (!idx > -1) {
                        sizes.splice(idx, 1);
                    }
                });
            }

            $scope.removeSize = function(name, count) {
                var sizes = $scope.product.sizes;
                angular.forEach($scope.product.sizes, function(size) {
                    if (size.name == name && size.count == count) {
                        var idx = sizes.indexOf(size);
                        if (idx > -1) {
                            sizes.splice(idx, 1);
                        }
                    }
                });
            }


            // Product colours
            $scope.selectedColour = '';
            $scope.colours = [
                'black',
                'grey',
                'white',
                'peru',
                'maroon',
                'red',
                'orange',
                'yellow',
                'lime',
                'green',
                'teal',
                'cyan',
                'cornflowerblue',
                'blue',
                'blueviolet',
                'magenta',
                'pink'
            ];

            $scope.isColour = function(colour) {
                if ($scope.selectedColour === '') {
                    return true;
                } else {
                    return $scope.selectedColour.indexOf(colour) > -1;
                }
            };

            $scope.toggleColour = function(colour) {
                if ($scope.selectedColour.indexOf(colour) > -1) {
                    $scope.selectedColour = '';
                    $product.colour = '';
                } else {
                    $scope.selectedColour = colour;
                    $product.colour = colour;
                };
            };

            // PRODUCT TEMPLATES

            $scope.simulateQuery = false;
            $scope.isDisabled = false;
            if ($rootScope.products) {
                $scope.templates = loadAll();
            } else {
                $scope.$on('products:filled', function(event, item) {
                    $scope.templates = loadAll();
                });
            }

            $scope.querySearch = querySearch;
            $scope.selectedItemChange = selectedItemChange;
            $scope.searchTextChange = searchTextChange;

            // Search for templates... use $timeout to simulate remote dataservice call.

            function querySearch(query) {
                var results = query ? $scope.templates.filter(createFilterFor(query)) : $scope.templates,
                    deferred;
                if ($scope.simulateQuery) {
                    deferred = $q.defer();
                    $timeout(function() {
                        deferred.resolve(results);
                    }, Math.random() * 1000, false);
                    return deferred.promise;
                } else {
                    return results;
                }
            }

            function searchTextChange(text) {
                $log.info('Text changed to ' + text);
            }

            function selectedItemChange(item) {
                $log.info('Item changed to ' + JSON.stringify(item));
                if (item !== undefined) {
                    //remove "DAK" from selected template code
                    item.code = item.code.substring(3);
                    //reset sizes
                    item.sizes = [{
                        name: "",
                        count: 0
                    }];
                    $scope.product = angular.copy(item);
                } else {
                    $scope.product = angular.copy(reset);
                }
            }

            /**
             * Build `components` list of key/value pairs
             */
            function loadAll() {
                var templates = $rootScope.products;
                return templates.map(function(template) {
                    template.value = template.name.toLowerCase();
                    return template;
                });
            }
            /**
             * Create filter function for a query string
             */
            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filterFn(item) {
                    return (item.value.indexOf(lowercaseQuery) === 0);
                };
            }




            // ----------------------------------
            // UPDATE CATS AND BRANDS
            // ----------------------------------

            function brandsCheck(brandToCheck) {
                var bool = false;
                if (brandToCheck !== '') {
                    angular.forEach($rootScope.brands, function(b) {
                        b = angular.lowercase(b);
                        brandToCheck = angular.lowercase(brandToCheck);
                        if (b === brandToCheck) bool = true;
                    });
                }
                return bool;
            }

            function kindsCheck(kindToCheck) {
                var bool = false;
                if (kindToCheck !== '') {
                    angular.forEach($rootScope.kinds, function(k) {
                        k = angular.lowercase(k);
                        kindToCheck = angular.lowercase(kindToCheck);
                        if (k === kindToCheck) bool = true;
                    });
                }
                return bool;
            }

            function typesCheck(typeToCheck) {
                var bool = false;
                if (typeToCheck !== '') {
                    angular.forEach($rootScope.types, function(t) {
                        t = angular.lowercase(t);
                        typeToCheck = angular.lowercase(typeToCheck);
                        if (t === typeToCheck) bool = true;
                    });
                }
                return bool;
            }

            function catsUpdate() {
                // update Brands
                var brandToAdd = $scope.product.brand;
                if (!brandsCheck(brandToAdd)) {
                    var data = {
                        brand: brandToAdd
                    };
                    $http.post("api/categories/post.brands.php", data);
                    $rootScope.brands.push(brandToAdd);
                } else {
                    //do nothing yet
                };

                // update Types
                var typeToAdd = $scope.product.type;
                if (!typesCheck(typeToAdd)) {
                    var data = {
                        type: typeToAdd
                    };
                    $http.post("api/categories/post.types.php", data);
                    $rootScope.types.push(typeToAdd);
                } else {
                    //do nothing yet
                };

                // update Kinds
                var kindToAdd = $scope.product.kind;
                if (!kindsCheck(kindToAdd)) {
                    var data = {
                        kind: kindToAdd
                    };
                    $http.post("api/categories/post.kinds.php", data);
                    $rootScope.kinds.push(kindToAdd);
                } else {
                    //do nothing yet
                };
            }



            //-------------------------------------
            //  UPLOADERS
            //-------------------------------------

            // Functions

            function rename(file) {
                var n = file.lastIndexOf('/');
                return [file.slice(0, n + 1), $scope.renameId + '/', file.slice(n + 1)].join('');
            }

            $scope.setShort = function(ev) {
                var typeSt = $scope.product.type;
                angular.forEach($rootScope.types, function(type) {
                    if (typeSt.indexOf(type.type) > -1) {
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

            // Define the uploaders
            var tempuploader = $scope.tempuploader = new FileUploader({
                url: 'api/products/uploadtemp.php',
                formData: []
            });
            var uploader1 = $scope.uploader1 = new FileUploader({
                url: 'api/products/upload.php',
                formData: []
            });
            var uploader2 = $scope.uploader2 = new FileUploader({
                url: 'api/products/upload.php',
                formData: []
            });
            var uploader3 = $scope.uploader3 = new FileUploader({
                url: 'api/products/upload.php',
                formData: []
            });
            var uploader4 = $scope.uploader4 = new FileUploader({
                url: 'api/products/upload.php',
                formData: []
            });
            var uploader5 = $scope.uploader5 = new FileUploader({
                url: 'api/products/upload.php',
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



            // --------------------------------
            // FORM SUBMIT
            // --------------------------------

            $scope.postData = {};
            $scope.submitProduct = function(product) {
                if ($scope.productForm.$valid) {
                    catsUpdate();
                    $scope.postData = angular.copy($scope.product);
                    console.log($scope.postData);
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

            // --------------------------------
            // FORM RESET
            // --------------------------------

            $scope.resetForm = function() {
                if (firstDone && secondDone && thirdDone && fourthDone && fifthDone) {
                    // proper reset form
                    $scope.product = angular.copy(reset);
                    $scope.temp = angular.copy(tempreset);
                    $scope.productForm.$setPristine();
                    $scope.productForm.$setUntouched();
                } else {
                    console.log("some of the uploaders haven't finished uploading")
                }
            }



        });

})();
