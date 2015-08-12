'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:cart
 * @description
 * # cart
 * Factory of the daksportsApp
 */
angular.module('daksportsApp')
    .factory('cart', function cartFactory($http) {
        var api = 'api/orders/';
        var obj = {};

        obj.post = function(item) {
            $http.post(api + 'post.php', item)
                .then(function(response) {
                    return response;
                }, function(response) {
                    return response;
                });
        }

        return obj;
    });
