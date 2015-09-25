(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AddCtrl', function($rootScope, $scope, $http, $filter, $parse, FileUploader, $interval, productRes) {

            $scope.buttonTitle = "Adauga Produs";
            $scope.state = "add";
            $scope.$on('$destroy', function() {
                $scope.state = null;
            });
        });

})();
