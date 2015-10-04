(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AdminCtrl', function($scope, $rootScope, $http, $filter, $parse, $timeout, $q, $log, productRes, FileUploader) {

            // --------------------------------
            // FORM RESET
            // --------------------------------

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
                favourite: null,
                published: 1,
                reviews: [],
                rating: 0
            };

            // Temp reset object
            var tempreset = {
                photo1: 'uploads/placeholder.png',
                photo2: 'uploads/placeholder.png',
                photo3: 'uploads/placeholder.png',
                photo4: 'uploads/placeholder.png',
                photo5: 'uploads/placeholder.png'
            }


            $scope.resetForm = function() {
                if (firstDone && secondDone && thirdDone && fourthDone && fifthDone) {
                    // proper reset form
                    $scope.product = angular.copy(reset);
                    $scope.temp = angular.copy(tempreset);
                    $scope.$broadcast('form:reset', {});
                } else {
                    console.log("some of the uploaders haven't finished uploading")
                }
            }

            // ---------------------------------
            //     PRODUCT & INITIAL STATE
            // ---------------------------------


            $scope.state = null;
            $scope.ready = false;

            // Initial state
            $scope.product = angular.copy(reset);
            $scope.temp = angular.copy(tempreset);
            $scope.temp.type = {};
            $scope.productForm = {};

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
                    $scope.product.colour = '';
                } else {
                    $scope.selectedColour = colour;
                    $scope.product.colour = colour;
                };
            };

            // ---------------------------------
            //     SIZES
            // ---------------------------------

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



            // --------------------------
            //    PRODUCT TEMPLATES
            // --------------------------

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
                    var code = item.code.substring(3);
                    //reset sizes
                    var sizes = [{
                        name: "",
                        count: 0
                    }];
                    $scope.product = angular.copy(item);
                    // $scope.setShort();
                    $scope.product.code = code;
                    $scope.product.sizes = sizes;
                    $scope.temp.type = $filter('filter')($rootScope.types, function(d) {
                        return d.type === item.type;
                    })[0];
                } else {
                    $scope.product = angular.copy(reset);
                    $scope.temp.type = {};
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
            //     UPDATE CATS AND BRANDS
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
                        t = angular.lowercase(t.type);
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
                        type: typeToAdd,
                        short: $scope.temp.typeShort
                    };
                    $http.post("api/categories/post.types.php", data);
                    $rootScope.types.push(data);
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


            // -------------------------------
            //     TYPE SHORTS
            // -------------------------------

            $scope.setCode = function() {
                console.log("setting code");
                console.log($scope.product.type);
                if (typesCheck($scope.product.type)) {
                    $scope.temp.type = $filter('filter')($rootScope.types, function(d) {
                        return d.type === $scope.product.type;
                    })[0];
                }

                var short = $scope.temp.type.short;
                var series = $filter('serialize')(short);

                var currentType = $scope.product.type;
                (currentType == "") ? $scope.product.code = " ": $scope.product.code = series;
            }

            $scope.limitShort = function(input) {
                console.log("limiting");
                $scope.temp.typeShort = angular.uppercase(input.substring(0, 3));
            }

            $scope.setInitType = function() {
                initialType = $scope.product.type;
            }

            $scope.setInitShort = function() {
                initialShort = $scope.temp.type.short;
            }

            $scope.defineShort = function() {
                console.log($scope.product.type);
                var short = $filter('shortify')($scope.product.type);
                $scope.temp.type.short = short;
                $scope.setCode();
            }



            // -------------------------------------
            //     UPLOADERS
            // -------------------------------------

            // Uploaders state
            var firstDone = false,
                secondDone = false,
                thirdDone = false,
                fourthDone = false,
                fifthDone = false;

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
                    code = 'DAK' + $scope.product.code,
                    value = 'uploads/' + year + '/' + month + '/' + code + '/' + filename;
                value = value.replace(/\s+/g, '_');
                $scope.product.file1 = value;
            };
            uploader1.onBeforeUploadItem = function(item) {
                item.formData = [];
                uploader1.formData = [{
                    year: $filter('date')($scope.product.added, 'yy'),
                    month: $filter('date')($scope.product.added, 'MM'),
                    code: 'DAK' + $scope.product.code
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
                    code = 'DAK' + $scope.product.code,
                    value = 'uploads/' + year + '/' + month + '/' + code + '/' + filename;
                value = value.replace(/\s+/g, '_');
                $scope.product.file2 = value;
            };
            uploader2.onBeforeUploadItem = function(item) {
                item.formData = [];
                uploader2.formData = [{
                    year: $filter('date')($scope.product.added, 'yy'),
                    month: $filter('date')($scope.product.added, 'MM'),
                    code: 'DAK' + $scope.product.code
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
                    code = 'DAK' + $scope.product.code,
                    value = 'uploads/' + year + '/' + month + '/' + code + '/' + filename;
                value = value.replace(/\s+/g, '_');
                $scope.product.file3 = value;
            };
            uploader3.onBeforeUploadItem = function(item) {
                item.formData = [];
                uploader3.formData = [{
                    year: $filter('date')($scope.product.added, 'yy'),
                    month: $filter('date')($scope.product.added, 'MM'),
                    code: 'DAK' + $scope.product.code
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
                    code = 'DAK' + $scope.product.code,
                    value = 'uploads/' + year + '/' + month + '/' + code + '/' + filename;
                value = value.replace(/\s+/g, '_');
                $scope.product.file4 = value;
            };
            uploader4.onBeforeUploadItem = function(item) {
                item.formData = [];
                uploader4.formData = [{
                    year: $filter('date')($scope.product.added, 'yy'),
                    month: $filter('date')($scope.product.added, 'MM'),
                    code: 'DAK' + $scope.product.code
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
                    code = 'DAK' + $scope.product.code,
                    value = 'uploads/' + year + '/' + month + '/' + code + '/' + filename;
                value = value.replace(/\s+/g, '_');
                $scope.product.file5 = value;
            };
            uploader5.onBeforeUploadItem = function(item) {
                item.formData = [];
                uploader5.formData = [{
                    year: $filter('date')($scope.product.added, 'yy'),
                    month: $filter('date')($scope.product.added, 'MM'),
                    code: 'DAK' + $scope.product.code
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

            function setTypes(item) {
                item.added = new Date(item.added);
                item.inv = parseFloat(item.inv);
                item.price = parseFloat(item.price);
                item.promo = parseFloat(item.promo);
                item.published = parseFloat(item.published);
                item.promo_price = parseFloat(item.promo_price);
                item.promo_stock = parseFloat(item.promo_stock);
                if (item.promo && item.promo_price) {
                    item.old_price = item.price;
                    item.new_price = item.promo_price;
                } else {
                    item.old_price = 0;
                    item.new_price = item.price;
                };
                item.old_price = parseFloat(item.old_price);
                item.new_price = parseFloat(item.new_price);
                (angular.isDate(item.promo_end)) ? item.promo_end = item.promo_end: item.promo_end = new Date(item.promo_end);
                // set some defaults for testing purposes
            }

            $scope.postData = {};
            $scope.submitProduct = function() {
                console.log("submitting product");
                catsUpdate();
                $scope.postData = angular.copy($scope.product);
                $scope.postData.code = 'DAK' + $scope.postData.code;
                // make the call
                productRes.post($scope.postData)
                    .then(function(response) {
                        $scope.upload();
                        setTypes($scope.postData);
                        $rootScope.products.push($scope.postData);
                    }).catch(function(error) {
                        return error;
                    });
            }

        });

})();