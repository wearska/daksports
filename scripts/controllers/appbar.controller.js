'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AppBarCtrl
 * @description
 * # AppBarCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AppBarCtrl', function($scope, $location) {
        var tabIndex = $location.path();
        $scope.selectedIndex = (tabIndex === "/contacts") ? 2 : (tabIndex === "/about") ? 1 : 0;
        
    });