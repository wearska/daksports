'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AppBarCtrl
 * @description
 * # AppBarCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AppBarCtrl', ['$scope', '$mdDialog', '$mdMedia', '$timeout', function($scope, $mdDialog, $mdMedia, $timeout) {
        $scope.showDocsNav = false;
        $scope.showMainNav = false;
        $scope.showMenu = false;
        $scope.showNavTrigger = false;

        $scope.$watch(function() {
            return $mdMedia('lg');
        }, function(big) {
            $scope.bigScreen = big;
        });

        $scope.screenIsSmall = $mdMedia('max-width: 960px');
        console.log($scope.screenIsSmall);

        $scope.test = function() {
            console.log("test");
        }

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
