(function() {
  'use strict';

  angular.module('daksportsApp')
    .controller('EditCtrl', function($scope, $http, $filter, $parse, $location, $stateParams, FileUploader, $interval, productRes) {

      var firstChanged = false,
        secondChanged = false,
        thirdChanged = false,
        fourthChanged = false,
        fifthChanged = false;
      // Initial state
      $scope.product = {};

      productRes.get($stateParams.productId)
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
            file1: response[0].file1,
            file2: response[0].file2,
            file3: response[0].file3,
            file4: response[0].file4,
            file5: response[0].file5
          };
          // Temp object
          var tempreset = {
            photo1: response[0].file1,
            photo2: response[0].file2,
            photo3: response[0].file3,
            photo4: response[0].file4,
            photo5: response[0].file5
          }
          $scope.product = angular.copy(reset);
          angular.forEach(tempreset, function(value, key) {
            if (value == '') {
              var str = 'temp.' + key;
              var model = $parse(str);
              model.assign($scope, '/uploads/placeholder.png');
            } else {
              var str = 'temp.' + key;
              var model = $parse(str);
              model.assign($scope, value);
            }
          });
        });

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
        var photoSrc = '/uploads/temp/' + fileItem.file.name;
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
        tempuploader.queue[0].url = 'api/uploadtemp.php';
        tempuploader.queue[0].formData = [{
          uploader: '1'
        }];
        tempuploader.uploadItem(0);
        firstChanged = true;
        var year = $filter('date')($scope.product.submissionDate, 'yy'),
          month = $filter('date')($scope.product.submissionDate, 'MM'),
          filename = uploader1.queue[uploader1.queue.length - 1].file.name,
          value = 'uploads/' + year + '/' + month + '/' + filename;
        value = value.replace(/\s+/g, '_');
        $scope.product.file1 = value;
      };
      uploader1.onBeforeUploadItem = function(item) {
        item.formData = [];
        uploader1.formData = [{
          year: $filter('date')($scope.product.submissionDate, 'yy'),
          month: $filter('date')($scope.product.submissionDate, 'MM')
        }];
        uploader1.queue[uploader1.queue.length - 1].url = 'api/products/upload.php';
        Array.prototype.push.apply(item.formData, uploader1.formData);
      };
      uploader1.onCompleteAll = function() {
        uploader1.clearQueue();
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
        secondChanged = true;
        var year = $filter('date')($scope.product.submissionDate, 'yy'),
          month = $filter('date')($scope.product.submissionDate, 'MM'),
          filename = uploader2.queue[uploader2.queue.length - 1].file.name,
          value = 'uploads/' + year + '/' + month + '/' + filename;
        value = value.replace(/\s+/g, '_');
        $scope.product.file2 = value;
      };
      uploader2.onBeforeUploadItem = function(item) {
        item.formData = [];
        uploader2.formData = [{
          year: $filter('date')($scope.product.submissionDate, 'yy'),
          month: $filter('date')($scope.product.submissionDate, 'MM')
        }];
        uploader2.queue[uploader2.queue.length - 1].url = 'api/products/upload.php';
        Array.prototype.push.apply(item.formData, uploader2.formData);
      };
      uploader2.onCompleteAll = function() {
        uploader2.clearQueue();
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
        thirdChanged = true;
        var year = $filter('date')($scope.product.submissionDate, 'yy'),
          month = $filter('date')($scope.product.submissionDate, 'MM'),
          filename = uploader3.queue[uploader3.queue.length - 1].file.name,
          value = 'uploads/' + year + '/' + month + '/' + filename;
        value = value.replace(/\s+/g, '_');
        $scope.product.file3 = value;
      };
      uploader3.onBeforeUploadItem = function(item) {
        item.formData = [];
        uploader3.formData = [{
          year: $filter('date')($scope.product.submissionDate, 'yy'),
          month: $filter('date')($scope.product.submissionDate, 'MM')
        }];
        uploader3.queue[uploader3.queue.length - 1].url = 'api/products/upload.php';
        Array.prototype.push.apply(item.formData, uploader3.formData);
      };
      uploader3.onCompleteAll = function() {
        uploader3.clearQueue();
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
        fourthChanged = true;
        var year = $filter('date')($scope.product.submissionDate, 'yy'),
          month = $filter('date')($scope.product.submissionDate, 'MM'),
          filename = uploader4.queue[uploader4.queue.length - 1].file.name,
          value = 'uploads/' + year + '/' + month + '/' + filename;
        value = value.replace(/\s+/g, '_');
        $scope.product.file4 = value;
      };
      uploader4.onBeforeUploadItem = function(item) {
        item.formData = [];
        uploader4.formData = [{
          year: $filter('date')($scope.product.submissionDate, 'yy'),
          month: $filter('date')($scope.product.submissionDate, 'MM')
        }];
        uploader4.queue[uploader4.queue.length - 1].url = 'api/products/upload.php';
        Array.prototype.push.apply(item.formData, uploader4.formData);
      };
      uploader4.onCompleteAll = function() {
        uploader4.clearQueue();
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
        fifthChanged = true;
        var year = $filter('date')($scope.product.submissionDate, 'yy'),
          month = $filter('date')($scope.product.submissionDate, 'MM'),
          filename = uploader5.queue[uploader5.queue.length - 1].file.name,
          value = 'uploads/' + year + '/' + month + '/' + filename;
        value = value.replace(/\s+/g, '_');
        $scope.product.file5 = value;
      };
      uploader5.onBeforeUploadItem = function(item) {
        item.formData = [];
        uploader5.formData = [{
          year: $filter('date')($scope.product.submissionDate, 'yy'),
          month: $filter('date')($scope.product.submissionDate, 'MM')
        }];
        uploader5.queue[uploader5.queue.length - 1].url = 'api/products/upload.php';
        Array.prototype.push.apply(item.formData, uploader5.formData);
      };
      uploader5.onCompleteAll = function() {
        uploader5.clearQueue();
      };

      $scope.upload = function() {
        if (uploader1.queue.length && firstChanged) {
          uploader1.uploadItem(uploader1.queue.length - 1);
        }
        if (uploader2.queue.length && secondChanged) {
          uploader2.uploadItem(uploader2.queue.length - 1);
        }
        if (uploader3.queue.length && thirdChanged) {
          uploader3.uploadItem(uploader3.queue.length - 1);
        }
        if (uploader4.queue.length && fourthChanged) {
          uploader4.uploadItem(uploader4.queue.length - 1);
        }
        if (uploader5.queue.length && fifthChanged) {
          uploader5.uploadItem(uploader5.queue.length - 1);
        }
      }

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
            'file1': product.file1,
            'file2': product.file2,
            'file3': product.file3,
            'file4': product.file4,
            'file5': product.file5,
            'added': product.submissionDate
          }
          $scope.upload();
          $http.post("api/put.php?id=" + $stateParams.productId, data)
            .success(function(data) {
              console.log(data);
              $location.path('admin/list');
            });
        } else {
          $scope.productForm.submitted = true;
        }
      }
    });

})();