'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('IndexCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log', function($scope, $timeout, $mdSidenav, $mdUtil, $log) {
        $scope.toggleSideNav = buildToggler();

        function buildToggler() {
            var debounceFn = $mdUtil.debounce(function() {
                $mdSidenav('left')
                    .toggle()
                    .then(function() {
                        $log.debug("toggle sidenav is done");
                    });
            }, 300);
            return debounceFn;
        }
    }]);