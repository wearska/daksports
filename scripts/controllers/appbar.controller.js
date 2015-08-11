'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AppBarCtrl
 * @description
 * # AppBarCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AppBarCtrl', function($rootScope, $scope, $timeout, auth, $mdSidenav, $mdUtil, $log) {
        $scope.showSearchBar = false;
        $scope.logged = false;
        $scope.accountLink = '/account/login'
        $scope.account = {};
        $scope.test = function() {
            // console.log(auth.isAuthenticated);
        }

        $scope.$watch(function() {
                return auth;
            },
            function(newVal, oldVal) {
                $scope.logged = auth.isAuthenticated;
                $scope.account = auth.account;
                $scope.account.admin = auth.account.admin;
            }, true);

        // TOGGLE SEARCH BAR
        $scope.toggleSearchBar = function() {
            $scope.showSearchBar = !$scope.showSearchBar;
        };
        $scope.hideSearchBar = function() {
            $scope.showSearchBar = false;
        };

        // TOGGLE NAV
        $scope.navOpen = false;

        $scope.toggleNav = function(){
            $scope.navOpen = !$scope.navOpen;
            console.log($scope.navOpen);
        }

    });
