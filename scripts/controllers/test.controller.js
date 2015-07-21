'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('TestCtrl', function($scope, $http, $filter, productRes, auth, $timeout, $mdSidenav, $mdUtil, $log) {
        $scope.products = {};

        productRes.query().success(function(response) {
            $scope.products = response;
        });

        // console.log(auth);
    });
