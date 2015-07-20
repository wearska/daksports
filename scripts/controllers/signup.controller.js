'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('SignupCtrl', ['$scope', '$http', 'FileUploader', '$location', function($scope, $http, FileUploader, $location) {

        $scope.user = {
            photo: 'assets/img/avatar_2x.png'
        };

        // Uploader options
        var uploader = $scope.uploader = new FileUploader({
            url: 'api/userphoto.php',
            //queueLimit : 1,
            //autoUpload: true,
            formData: []
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
            $scope.user.photo = addedFileItems[0].file.name;
        };
        var i = 0;

        uploader.onCompleteAll = function() {
            $scope.user.photo = 'uploads/userpics/' + uploader.queue[uploader.queue.length - 1].file.name;
            $scope.user.photo = $scope.user.photo.replace(/\s+/g, '_');
            // console.log($scope.user.photo);
        };

        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };

        uploader.onBeforeUploadItem = function(item) {
            item.formData = [];
            console.log($scope.user.email)
            uploader.formData = [{
                email: $scope.user.email
            }];
            Array.prototype.push.apply(item.formData, uploader.formData);
        };

        // Register function
        $scope.signup = function(user) {
            if ($scope.signupForm.$valid) {
                var data = $scope.user;
                $http.post("api/signup.php", data)
                    .success(function(data) {
                        console.log(data);
                    });
                if (uploader.queue.length) {
                    uploader.uploadItem(uploader.queue.length - 1);
                }
                $location.path('account/login');
            } else {
                $scope.signupForm.submitted = true;
            }
        }

    }]);
