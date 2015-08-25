(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AuthCtrl', ['$http', '$rootScope', '$scope', '$location', 'Auth', 'FileUploader', '$mdToast',
            function($http, $rootScope, $scope, $location, Auth, FileUploader, $mdToast) {

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
                $scope.userData = {};

                // CREATE
                $scope.create = function(credentials) {
                    if ($scope.signupForm.$valid) {
                        Auth.$createUser({
                                email: credentials.email,
                                password: credentials.password
                            }).then(function(authData) {
                                //post user data
                                $scope.userData = angular.copy(credentials);
                                $scope.userData.uid = authData.uid;
                                $scope.userData.created = new Date();
                                $scope.userData.password = null;
                                console.log($scope.userData);
                                // console.log(credentials);
                                $http.post('api/accounts/post.php', $scope.userData)
                                    .then(function(response) {
                                        console.log(response.data);
                                    }).catch(function(error) {
                                        return error;
                                    });
                                //login user after create
                                $location.path('/auth/login');
                                // return Auth.$authWithPassword({
                                //     email: credentials.email,
                                //     password: credentials.password
                                // });
                            })
                            // .then(function(authData) {
                            //     console.log("Logged in as:", authData.uid);
                            // }).catch(function(error) {
                            //     console.error("Error: ", error);
                            // });
                        if (uploader.queue.length) {
                            uploader.uploadItem(uploader.queue.length - 1);
                        }
                        // $location.path('account/login');
                    } else {
                        $scope.signupForm.submitted = true;
                    }
                };

                // REMOVE
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
                    $scope.secondStep = true;
                    $scope.firstStep = false;
                    // get user data
                    $http.get('api/accounts/getuserphoto.php?email=' + credentials.email)
                        .then(function(response) {
                            console.log(response.data);
                            $rootScope.userData.user_photo = response.data[0].user_photo;
                            $rootScope.userData.first_name = response.data[0].first_name;
                            $rootScope.userData.last_name = response.data[0].last_name;
                        }).catch(function(error) {
                            $rootScope.userData = {};
                            return error;
                        });
                };
                $scope.stepBack = function() {
                    $scope.secondStep = false;
                    $scope.firstStep = true;
                };
                $scope.login = function(credentials) {
                    $scope.loginForm.submitted = true;
                    if ($scope.loginForm.$valid) {
                        Auth.$authWithPassword({
                            email: credentials.email,
                            password: credentials.password
                        }).then(function(authData) {
                            console.log("Logged in as:", authData.uid);
                            $location.path('/');
                        }).catch(function(error) {
                            console.error("Authentication failed:", error);
                        });
                    }
                };
                $scope.logout = function() {
                    $scope.loginForm.submitted = true;
                    Auth.$unauth();
                };

                // create process
                $scope.credentials = {
                    user_photo: 'assets/img/avatar_2x.png'
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
                    $scope.credentials.user_photo = addedFileItems[0].file.name;
                };
                var i = 0;
                uploader.onCompleteAll = function() {
                    $scope.credentials.user_photo = 'uploads/userpics/' + $scope.credentials.email + '/' + uploader.queue[uploader.queue.length - 1].file.name;
                    $scope.credentials.user_photo = $scope.credentials.user_photo.replace(/\s+/g, '_');
                };
                uploader.onCompleteItem = function(fileItem, response, status, headers) {
                    // console.info('onCompleteItem', fileItem, response, status, headers);
                };
                uploader.onBeforeUploadItem = function(item) {
                    item.formData = [];
                    uploader.formData = [{
                        email: $scope.credentials.email
                    }];
                    Array.prototype.push.apply(item.formData, uploader.formData);
                };
            }
        ]);

})();
