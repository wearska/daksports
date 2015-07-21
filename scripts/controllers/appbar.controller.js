'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AppBarCtrl
 * @description
 * # AppBarCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AppBarCtrl', ['$rootScope', '$scope', '$mdDialog', '$mdMedia', '$timeout', 'auth', function($rootScope, $scope, $mdDialog, $mdMedia, $timeout, auth) {
        $scope.showDocsNav = false;
        $scope.showMainNav = false;
        $scope.showMenu = false;
        $scope.showNavTrigger = false;
        $scope.showSearchBar = false;
        $scope.logged = false;
        $scope.accountLink = '/account/login'
        $scope.account = {};

        $scope.test = function() {
            // console.log(auth.isAuthenticated);
        }

        $scope.$watch(function() {
                return auth.isAuthenticated;
            },
            function(newVal, oldVal) {
                $scope.logged = auth.isAuthenticated;
                $scope.account = auth.isUser;
                // $scope.accountLink = '/account/dashboard';
                console.log(auth.isUser);
            }, true);
        // TOGGLE SEARCH BAR
        $scope.toggleSearchBar = function() {
            $scope.showSearchBar = !$scope.showSearchBar;
        };
        $scope.hideSearchBar = function() {
            $scope.showSearchBar = false;
        };

        // TOGGLE MAIN NAV (TOP) ON MOBILE
        $scope.toggleDocsMenu = function() {
            $scope.showDocsNav = !$scope.showDocsNav;
        };

        // TOGGLE DOCS NAV
        $scope.toggleMainMenu = function() {
            $scope.showMainNav = !$scope.showMainNav;
        };

        // SHOW MAIN NAV
        $scope.toggleMainNav = function() {
            $scope.showMainNav = !$scope.showMainNav;
        };

        // TOGGLE DOCS VERSION & LANGUAGE
        $scope.toggleVersionMenu = function() {
            $scope.showMenu = !$scope.showMenu;
        };
    }]);
