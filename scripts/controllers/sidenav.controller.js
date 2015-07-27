'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:SideNavCtrl
 * @description
 * # SideNavCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('NestedListCtrl', function($scope, $mdSidenav, $mdUtil, $log) {
        $scope.isToggled = false;
        $scope.toggle = function() {
            $scope.isToggled = !$scope.isToggled;
        }
        $scope.focusSection = function() {
            $mdSidenav('left').close()
                .then(function() {
                    //execute after sidenav closes
                });
        }
    })
    .controller('SideNavCtrl', function($rootScope, $scope, $timeout, auth, $mdSidenav, $mdUtil, $log) {

        $scope.logged = false;
        $scope.account = {};
        console.log($scope.account);
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
