'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('TestCtrl', ['$scope', '$http', '$filter', 'productRes', function($scope, $http, $filter, productRes) {

        $scope.test = {
            date : new Date()
        }

        $scope.testFunc = function(test) {
            $http.get("api/test.php")
                .success(function(data) {
                    console.log(data);
                });
            var newTest = $scope.test;
            var year = $filter('date')(newTest.date, 'yy');
            var month = $filter('date')(newTest.date, 'MM');
            console.log(year + " & " + month);
        }

        var result = productRes.remove(100);
        console.log(result);
    }]);
