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

        var obj = {
            isAuthenticated: $cookies.get('loggedin'),
            account: {
                userid : $cookies.get('ID'),
                email : $cookies.get('email'),
                admin : $cookies.get('admin'),
                photo : $cookies.get('user_photo'),
                firstName : $cookies.get('first_name'),
                lastName : $cookies.get('last_name')
            },

            login: function(user) {
                $http.post("api/getuserlogin.php", user)
                    .success(function(response) {
                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 1);
                        if (response) {
                            $cookies.put('loggedin', true);
                            angular.forEach(response, function(value, key) {
                                $cookies.put(key, value);
                            });
                            $location.path('/');
                            obj.isAuthenticated = true;
                            obj.account.userid = response.ID;
                            obj.account.email = response.email;
                            obj.account.admin = response.admin;
                            obj.account.photo = response.user_photo;
                            obj.account.firstName = response.first_name;
                            obj.account.lastName = response.last_name;
                        } else {
                            alert('Incorrect email or password');
                        }
                    });
            },
            logout: function() {
                obj.isAuthenticated = false;
                obj.account = {};
                $cookies.remove('loggedin');
                $cookies.remove('address');
                $cookies.remove('admin');
                $location.path('/');
            }
        };

        return obj;
    });
