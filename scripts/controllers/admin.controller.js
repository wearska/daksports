'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AdminCtrl', function($scope) {
        console.log("using admin controller");
        var list = 'views/admin/list.html',
            search = 'views/admin/search.html',
            add = 'views/admin/add.html',
            edit = 'views/admin/edit.html';
        $scope.includeVal = list.toString();
        console.log($scope.includeVal);
    });