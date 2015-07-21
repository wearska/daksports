'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$location', 'auth', '$cookies', function($rootScope, $scope, $http, $location, auth, $cookies) {

        // console.log("Login Ctrl");
        // console.log(auth.isAuthenticated);

        $scope.firstStep = true;
        $scope.secondStep = false;
        $scope.user = {
            photo: '/uploads/userpics/photo.png'
        };

        $scope.loginStep = function() {
            var data = $scope.user.email;
            $scope.secondStep = true;
            $scope.firstStep = false;
            $http.get("api/getuserphoto.php?email=" + data)
                .success(function(response) {
                    $scope.user.photo = response[0].user_photo;
                    $scope.user.firstName = response[0].first_name;
                    $scope.user.lastName = response[0].last_name;
                });
        }
        $scope.stepBack = function() {
            $scope.secondStep = false;
            $scope.firstStep = true;
        }

        $scope.login = function(user) {
            if ($scope.loginForm.$valid) {
                var data = user;
                $http.post("api/getuserlogin.php", data)
                    .success(function(response) {
                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 1);
                        console.log(expireDate);
                        if (response == 'true') {
                            $cookies.put('loggedin', true, {
                                'expires': expireDate
                            });
                            $cookies.put('user', $scope.user.email, {
                                'expires': expireDate
                            });
                            $location.path('/test');
                            auth.isAuthenticated = true;
                            auth.isUser = $scope.user;
                        } else {
                            alert('Incorrect email or password');
                        }
                    });
            } else {
                $scope.loginForm.submitted = true;
            }
        }

    }]);