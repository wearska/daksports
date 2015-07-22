'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:auth
 * @description
 * # auth
 * Factory of the daksportsApp
 */
angular.module('daksportsApp')
    .factory('auth', function authFactory($http, $cookies, $location) {

        var data = $cookies.get('user');
        var user = {};
        $http.get("api/getuserphoto.php?email=" + data)
            .success(function(response) {
                if (response != '') {
                    obj.isUser.photo = response[0].user_photo;
                    obj.isUser.firstName = response[0].first_name;
                    obj.isUser.lastName = response[0].last_name;
                }
            });

        var obj = {
            isAuthenticated: $cookies.get('loggedin'),
            isAdmin: false,
            isUser: {},

            login: function(user) {
                $http.post("api/getuserlogin.php", user)
                    .success(function(response) {
                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 1);
                        if (response == 'true') {
                            $cookies.put('loggedin', true, {
                                'expires': expireDate
                            });
                            $cookies.put('user', user.email, {
                                'expires': expireDate
                            });
                            $location.path('/test');
                            obj.isAuthenticated = true;
                            obj.isUser = user;
                        } else {
                            alert('Incorrect email or password');
                        }
                    });
            },
            logout: function() {
                obj.isAuthenticated = false;
                obj.isUser = {};
                $cookies.remove('loggedin');
                $cookies.remove('user');
            }
        };

        return obj;
    });
