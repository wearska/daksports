'use strict';

angular.module('daksportsApp')
    .controller('AuthCtrl', ['$scope', '$location', 'Auth', 'Account', 'FileUploader', '$firebaseAuth', '$mdToast',
        function($scope, $location, Auth, Account, FileUploader, $firebaseAuth, $mdToast) {

            // functions
            $scope.toastPosition = {
                bottom: false,
                top: true,
                left: false,
                right: true
            };
            $scope.getToastPosition = function() {
                return Object.keys($scope.toastPosition)
                    .filter(function(pos) {
                        return $scope.toastPosition[pos];
                    })
                    .join(' ');
            };
            $scope.showSimpleToast = function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Simple Toast!')
                    .position($scope.getToastPosition())
                    .hideDelay(3000)
                );
            };


            // initialize the scope objects
            $scope.firstStep = true;
            $scope.secondStep = false;
            $scope.userData = {
                photo: '/uploads/userpics/photo.png'
            };

            //Auth create, login, logout, remove users
            $scope.createUser = function(credentials) {
                $scope.message = null;
                $scope.error = null;

                Auth.$createUser({
                    email: credentials.email,
                    password: credentials.password
                }).then(function(userData) {
                    $scope.message = 'User created with uid: ' + userData.uid;
                }).catch(function(error) {
                    $scope.error = error;
                });
            };
            $scope.loginUser = function(credentials) {
                Auth.$authWithPassword({
                    email: credentials.email,
                    password: credentials.password
                }).then(function(authData) {
                    $location.path("/");
                }).catch(function(error) {
                    // console.error('Authentication failed:', error);
                    console.log(error.toString());
                    $scope.showSimpleToast();
                });
            };

            $scope.removeUser = function(credentials) {
                $scope.message = null;
                $scope.error = null;

                Auth.$removeUser({
                    email: credentials.email,
                    password: credentials.password
                }).then(function() {
                    $scope.message = 'User removed';
                }).catch(function(error) {
                    $scope.error = error;
                });
            };

            // login process
            $scope.loginStep = function(credentials) {
                console.log(credentials);
                $scope.secondStep = true;
                $scope.firstStep = false;
                // get user data
                Account.getUserData(credentials.email)
                    .then(function(userData) {
                        $scope.userData.photo = userData.user_photo;
                    }).catch(function(error) {
                        $scope.error = error;
                    });
            };
            $scope.stepBack = function() {
                $scope.secondStep = false;
                $scope.firstStep = true;
            };
            $scope.login = function(credentials) {
                if ($scope.loginForm.$valid) {
                    $scope.loginUser(credentials);
                } else {
                    $scope.loginForm.submitted = true;
                }
            }
            
            // create process
            $scope.credentials = {
                photo: 'assets/img/avatar_2x.png'
            };
            
            // uploader options
            var uploader = $scope.uploader = new FileUploader({
                url: 'api/accounts/uploaduserphoto.php',
                formData: []
            });
            
            // uploader filters
            uploader.filters.push({
                name: 'imageFilter',
                fn: function(item /*{File|FileLikeObject}*/ , options) {
                    var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                }
            });
            
            // uploader methods
            uploader.onAfterAddingAll = function(addedFileItems) {
                $scope.credentials.photo = addedFileItems[0].file.name;
                console.log(uploader.queue);
            };
            var i = 0;
            uploader.onCompleteAll = function() {
                $scope.credentials.photo = 'uploads/userpics/' + uploader.queue[uploader.queue.length - 1].file.name;
                $scope.credentials.photo = $scope.credentials.photo.replace(/\s+/g, '_');
            };
            uploader.onCompleteItem = function(fileItem, response, status, headers) {
                console.info('onCompleteItem', fileItem, response, status, headers);
            };
            uploader.onBeforeUploadItem = function(item) {
                item.formData = [];
                uploader.formData = [{
                    email: $scope.credentials.email
                }];
                Array.prototype.push.apply(item.formData, uploader.formData);
            };
            
            // register function
            $scope.signup = function(credentials) {
                if ($scope.signupForm.$valid) {
                    $scope.createUser(credentials);
                    if (uploader.queue.length) {
                        uploader.uploadItem(uploader.queue.length - 1);
                    }
                    // $location.path('account/login');
                } else {
                    $scope.signupForm.submitted = true;
                }
            };
        }
    ]);