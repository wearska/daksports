'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AppCtrl', ['$scope', '$mdDialog', '$timeout', function($scope, $mdDialog, $timeout) {
        $scope.showDocsNav = false;
        $scope.showMainNav = false;
        $scope.showMenu = false;

        // TOGGLE MAIN NAV (TOP) ON MOBILE
        $scope.toggleDocsMenu = function() {
            $scope.showDocsNav = !$scope.showDocsNav;
        };

        // TOGGLE DOCS NAV
        $scope.toggleMainMenu = function() {
            $scope.showMainNav = !$scope.showMainNav;
        };
        
        // TOGGLE DOCS VERSION & LANGUAGE
        $scope.toggleVersionMenu = function() {
            $scope.showMenu = !$scope.showMenu;
        };
    }]);