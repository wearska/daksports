(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('ListCtrl', function($scope, $rootScope) {
            $scope.search = "";
            $scope.clearSearch = function(){
                $scope.search = "";
            };

        });

})();
