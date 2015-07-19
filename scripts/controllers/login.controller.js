'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('LoginCtrl', ['$scope', '$http', '$filter', 'FileUploader', '$interval', function($scope, $http, $filter, FileUploader, $interval) {
        console.log("using account controller");

        $scope.user = {};

        $scope.login = function(user) {
            if ($scope.loginForm.$valid) {
                console.log(user);
            } else {
                $scope.loginForm.submitted = true;
            }
        }

    }]);