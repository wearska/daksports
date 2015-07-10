'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('ListCtrl', function($scope, $http) {
        /*
         * This method will be called on click event of button.
         * Here we will read the email and password value and call our PHP file.
         */
        $scope.check_credentials = function() {
            var data = {
                'name': $scope.companyname,
                'city': $scope.city,
                'country': $scope.country
            }
            console.log(data);
            $http.post("api/save.php", data)
                .success(function(data) {
                    console.log(data);
                });
        }
    });
