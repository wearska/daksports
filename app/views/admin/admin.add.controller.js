(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AddCtrl', function($rootScope, $scope, $http, $filter, $parse, FileUploader, $interval, productRes) {

            $scope.buttonTitle = "Adauga Produs";
            $scope.state = "add";
            $scope.$on('$destroy', function() {
                $scope.state = null;
            });
            $scope.checkForm = function(){
                if ($scope.productForm.$valid) {
                    console.log("form valid");
                    $scope.submitProduct();
                } else {
                    console.log("form not valid");
                    $scope.productForm.submitted = true;
                }
            }
            $scope.$on('form:reset', function(){
                $scope.productForm.$setPristine();
                $scope.productForm.$setUntouched();
            })
        });

})();
