'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('IndexCtrl', function($scope, $location, auth, productRes) {
        $scope.logged = false;
        $scope.account = {};
        $scope.products = {};
        productRes.query().success(function(response) {
            $scope.products = response;
        });
        $scope.$watch(function() {
                return auth;
            },
            function(newVal, oldVal) {
                $scope.logged = auth.isAuthenticated;
                $scope.account = auth.account;
                $scope.account.admin = auth.account.admin;
            }, true);

        $scope.logout = function() {
            auth.logout();
        }
        
    });