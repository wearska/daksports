'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:SideNavCtrl
 * @description
 * # SideNavCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('NestedListCtrl', function($scope) {
        $scope.isToggled = false;
        $scope.toggle = function() {
            $scope.isToggled = !$scope.isToggled;
        }
    })
    .controller('SideNavCtrl', function($rootScope, $scope, $timeout, auth, $mdSidenav, $mdUtil, $log) {

        $scope.logged = false;
        $scope.account = {};

        $scope.$watch(function() {
                return auth;
            },
            function(newVal, oldVal) {
                $scope.logged = auth.isAuthenticated;
                $scope.account = auth.isUser;
            }, true);

        $scope.logout = function(){
            auth.logout();
        }


    });
