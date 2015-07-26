'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('ListCtrl', function($scope, $http, $resource, $location) {

        $scope.products = {};

        $scope.clearSearch = function(){
            $scope.search = "";
        }

        $http.get("api/query.php")
            .success(function(response) {
                $scope.products = response;
            });
    });
