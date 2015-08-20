'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:FilterBlockCtrl
 * @description
 * # FilterBlockCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('FilterBlockCtrl', function($scope) {

    })
    .controller('FilterParentCtrl', function($scope){
        $scope.expanded = false;
        $scope.active = false;
        $scope.expand = function(){
            $scope.expanded = !$scope.expanded;
        }
    });
