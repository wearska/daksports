'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:auth
 * @description
 * # auth
 * Factory of the daksportsApp
 */
angular.module('daksportsApp')
    .factory('auth', ['$http', function authFactory($http) {

        var obj = {
            isAuthenticated : false,
            isAdmin : false,
            isUser : {}
        };

        return obj;
    }]);
