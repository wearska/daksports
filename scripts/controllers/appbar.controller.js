'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:appBarCtrl
 * @description
 * # appBarCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('appBarCtrl', ['$scope', '$mdDialog', '$timeout', function($scope, $mdDialog, $timeout) {
        $scope.showDocsNav = false;
        $scope.showMainNav = false;
        $scope.showMenu = false;
        
        $scope.test = function(){
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
        
        // TOGGLE DOCS VERSION & LANGUAGE
        $scope.toggleVersionMenu = function() {
            $scope.showMenu = !$scope.showMenu;
        };
    }]);