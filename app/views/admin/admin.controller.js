(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AdminCtrl', function($scope, $rootScope, $mdDialog) {
            $rootScope.noNav = true;
            $scope.$on('$destroy', function() {
                $rootScope.noNav = false;
            });
            $scope.colours = [
                'black',
                'white',
                'red',
                'yellow',
                'blue',
                'green',
                'orange',
                'teal',
                'magenta'
            ];
        });

})();
