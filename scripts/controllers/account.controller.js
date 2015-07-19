'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AccountCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.user = {};
        
        var isAuthenticated = false;
        
        console.log(isAuthenticated);
        if(!isAuthenticated){
            $location.path('/account/login');
        }

    }]);