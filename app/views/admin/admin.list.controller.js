(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('ListCtrl', function($scope, $rootScope, $filter, productRes) {
            $scope.search = "";
            $scope.clearSearch = function() {
                $scope.search = "";
            };
            $scope.removeItem = function(pid) {
                $rootScope.products = $filter('filter')($rootScope.products, function(value, index) {
                    return value.id !== pid;
                });
                productRes.remove(pid);
            };

        });

})();