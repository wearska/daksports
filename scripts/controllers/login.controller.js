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

        console.log("Login Ctrl");
        console.log(auth.isAuthenticated);

        $scope.firstStep = false;
        $scope.user = {
            photo: 'assets/img/avatar_2x.png'
        };

        $scope.loginStep = function() {
            var data = $scope.user.email;
            $scope.firstStep = true;
            $http.get("api/getuserphoto.php?email=" + data)
                .success(function(response) {
                    $scope.user.photo = response[0].user_photo;
                });
        }

        $scope.login = function(user) {
            if ($scope.loginForm.$valid) {
                var data = user;
                $http.post("api/getuserlogin.php", data)
                    .success(function(response) {
                        console.log(response);
                        if(response == 'true'){
                            $location.path('/test');
                        }else{
                            alert('Incorrect email or password');
                        }
                    });
            } else {
                $scope.loginForm.submitted = true;
            }
        }

    }]);
