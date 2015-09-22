(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('TestCtrl', function($http, $rootScope, $scope, $state, $timeout) {
            $scope.sayItems = function(){
                console.log(angular.toJson($rootScope.kinds));
            }
            $scope.sayItems();
        });

})();
