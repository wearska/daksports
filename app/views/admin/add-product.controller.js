(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AddCtrl', function($scope, $http, $filter, $parse, FileUploader, $interval, productRes) {

            var firstDone = false,
                secondDone = false,
                thirdDone = false,
                fourthDone = false,
                fifthDone = false;

            // Reset object
            var reset = {
                name: "Pantofi skate",
                subname: "Reebok Rcf Lite Tr Poly",
                slug: "",
                price: 299.99,
                inv: 23,
                promo: 1,
                promo_price: 259.99,
                promo_stock: 10,
                promo_end: new Date(),
                excerpt: "Reebok Rcf Lite Tr Poly sunt un must-have al oricarui impatimit de miscare!",
                description: "Imbinand standardul de confort cu un stil cat se poate de cool, pantofii sport Reebok Rcf Lite Tr Poly sunt un must-have al oricarui impatimit de miscare! Material: exterior - material textil; interior - material textil; talpa - cauciuc. Culoare: albastru (Navy) cu elemente de design albe si albastre. Ortholite: gratie acestei tehnologii moderne, acesti pantofi sport iti asigura un confort sporit, impiedica aparitia transpiratiei si are agenti antimicrobieni. Gulerul inalt si captuseala vor transforma fiecare antrenament intr-o adevarata placere. Pe una dintre partile laterale, pantofii dispun de doua perforatii, lasandu-ti piciorul sa respire in voie. Talpa este una speciala, asigurand stabilitatea picioarelor tale indiferent de suprafata pe care mergi. Datorita design-ului inedit al pantofilor, te vei bucura de aprecierile celor din jur si de un oufit sport autentic.",
                brand: "Reebok",
                main_cat: "Outdoor",
                sub_cat: "Skate",
                age: 0,
                gender: 0,
                file1: "uploads/placeholder.png",
                file2: "uploads/placeholder.png",
                file3: "uploads/placeholder.png",
                file4: "uploads/placeholder.png",
                file5: "uploads/placeholder.png",
                added: new Date(),
                favourite: ""
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
            $scope.brands = [
                "Adidas",
                "Puma",
                "Nike",
                "Reebok",
                "Le Coq Sportif"
            ];
            $scope.main_cats = [
                "Sporturi",
                "Outdoor",
                "Fitness",
                "Alergare",
                "Accesorii"
            ];
            
            function rename(file){
                var n = file.lastIndexOf('/');
                return [file.slice(0, n+1), $scope.product.id + '/', file.slice(n+1)].join('');
            }
            
            function setFiles(){
                $scope.product.file1 = rename($scope.product.file1);
                $scope.product.file2 = rename($scope.product.file2);
                $scope.product.file3 = rename($scope.product.file3);
                $scope.product.file4 = rename($scope.product.file4);
                $scope.product.file5 = rename($scope.product.file5);
                productRes.put($scope.product);
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
                url: 'api/uploadtemp.php',
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

            $scope.upload = function() {
                if (uploader1.queue.length) {
                    uploader1.uploadItem(uploader1.queue.length - 1);
                }else{
                    firstDone = true;
                }
                if (uploader2.queue.length) {
                    uploader2.uploadItem(uploader2.queue.length - 1);
                }else{
                    secondDone = true;
                }
                if (uploader3.queue.length) {
                    uploader3.uploadItem(uploader3.queue.length - 1);
                }else{
                    thirdDone = true;
                }
                if (uploader4.queue.length) {
                    uploader4.uploadItem(uploader4.queue.length - 1);
                }else{
                    fourthDone = true;
                }
                if (uploader5.queue.length) {
                    uploader5.uploadItem(uploader5.queue.length - 1);
                }else{
                    fifthDone = true;
                }
            }

            $scope.insertProduct = function(product) {
                if ($scope.productForm.$valid) {
                    //console.log(product);
                    //make the call
                    var product = $scope.product;
                    // (product.promo) ? product.promo = 1 : product.promo = 0;
                    var data = {
                        'name': product.name,
                        'subname': product.subname,
                        'slug': product.slug,
                        'brand': product.brand,
                        'main_cat': product.main_cat,
                        'sub_cat': product.sub_cat,
                        'inv': product.inv,
                        'price': product.price,
                        'promo': product.promo,
                        'promo_price': product.promo_price,
                        'promo_stock': product.promo_stock,
                        'promo_end': product.promo_end,
                        'excerpt': product.excerpt,
                        'desc': product.description,
                        'file1': product.file1,
                        'file2': product.file2,
                        'file3': product.file3,
                        'file4': product.file4,
                        'file5': product.file5,
                        'added': product.added,
                        'favourite': null
                    }

                    if (!product.file1) {
                        $scope.resetForm();
                    }
                    productRes.post($scope.product)
                    .then(function(response) {
                        console.log(response.data);
                        product.id = response.data;
                        setFiles();
                        $scope.upload();
                    }).catch(function(error) {
                        return error;
                    });
                    
                } else {
                    $scope.productForm.submitted = true;
                }
            }
        });

})();