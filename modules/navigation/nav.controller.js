'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('NavCtrl', function($rootScope, $scope, $timeout, auth, nav) {
        
        // nav toggle
        $scope.navOpen = nav.navOpen;
        $scope.toggleNav = function(){
            nav.toggleNav();    
        };
        $scope.$watch(function() {
                return nav;
            },
            function(newVal, oldVal) {
                $scope.navOpen = nav.navOpen;
            }, true);
        
        $scope.logged = false;
        $scope.account = {};
        $scope.subToggle = false;
        $scope.sports = false;
        $scope.accountMenu = false;
        $scope.mainToggle = function (){
            $scope.subToggle = !$scope.subToggle;
        }
        $scope.toggleSports = function(){
            $scope.subToggle = !$scope.subToggle;
            $scope.sports = true;
            $scope.accountMenu = false;
        };
        $scope.toggleAccount = function(){
            $scope.subToggle = !$scope.subToggle;
            $scope.sports = false;
            $scope.accountMenu = true;
        };
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
