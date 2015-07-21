'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('LoginCtrl', ['$rootScope', '$scope', '$http', '$location', 'auth', function($rootScope, $scope, $http, $location, auth) {

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
        $scope.stepBack = function(){
            $scope.secondStep = false;
            $scope.firstStep = true;
        }

        $scope.login = function(user) {
            if ($scope.loginForm.$valid) {
                var data = user;
                $http.post("api/getuserlogin.php", data)
                    .success(function(response) {
                        // console.log(response);
                        if(response == 'true'){
                            $location.path('/test');
                            auth.isAuthenticated = true;
                            auth.isUser = $scope.user;
                        }else{
                            alert('Incorrect email or password');
                        }
                    });
            } else {
                $scope.loginForm.submitted = true;
            }
        }

    }]);
