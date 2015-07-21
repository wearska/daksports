'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:auth
 * @description
 * # auth
 * Factory of the daksportsApp
 */
angular.module('daksportsApp')
    .factory('auth', ['$http', '$cookies', function authFactory($http, $cookies) {

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
            isUser: {}
        };

        return obj;
    }]);