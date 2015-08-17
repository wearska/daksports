'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('IndexCtrl', function($http, $scope, $location, productRes, Auth) {
        // Products

        $scope.products = {};

        productRes.query().success(function(response) {
            $scope.products = response;
        });

        // Authentication
        $scope.userData = {};
        $scope.logged = false;

        Auth.$onAuth(function(authData) {
            if (authData) {
                $http.get('api/accounts/getuserdata.php?email=' + authData.password.email)
                    .then(function(response) {
                        $scope.userData = response.data;
                        console.log($scope.userData);
                    }).catch(function(error) {
                        $scope.userData = {};
                        return error;
                    });
                $scope.logged = true;
            } else {
                $scope.userData = {};
                $scope.logged = false;
                console.log($scope.userData);
            }
        });

        $scope.logout = function() {
            Auth.$unauth();
        };
    });
