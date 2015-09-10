(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('StoreCtrl', function($rootScope, $scope, $state) {
            $rootScope.state = $state.current.name;

            $scope.$on('$destroy', function() {
                // Make sure that the interval is destroyed too
                $rootScope.state = undefined;
            });

            $rootScope.filtered = angular.copy($rootScope.products);
        });

})();
