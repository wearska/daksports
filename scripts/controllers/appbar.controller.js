'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:appBarCtrl
 * @description
 * # appBarCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('appBarCtrl', function($scope, $location) {
        var tabIndex = $location.path();
        $scope.selectedIndex = (tabIndex === "/contacts") ? 2 : (tabIndex === "/about") ? 1 : 0;
        
    });