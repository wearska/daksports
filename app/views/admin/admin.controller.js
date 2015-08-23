(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AdminCtrl', function($scope, $rootScope) {
            $rootScope.noNav = true;
            $scope.$on('$destroy', function() {
              $rootScope.noNav = false;
            });
        });

})();