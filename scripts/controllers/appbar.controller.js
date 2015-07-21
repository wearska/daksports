'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:AppBarCtrl
 * @description
 * # AppBarCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('AppBarCtrl', function($rootScope, $scope, $timeout, auth, $mdSidenav, $mdUtil, $log) {
        $scope.showSearchBar = false;
        $scope.logged = false;
        $scope.accountLink = '/account/login'
        $scope.account = {};

        $scope.test = function() {
            // console.log(auth.isAuthenticated);
        }

        $scope.$watch(function() {
                return auth;
            },
            function(newVal, oldVal) {
                $scope.logged = auth.isAuthenticated;
                $scope.account = auth.isUser;
                console.log($scope.account);
            }, true);
        // TOGGLE SEARCH BAR
        $scope.toggleSearchBar = function() {
            $scope.showSearchBar = !$scope.showSearchBar;
        };
        $scope.hideSearchBar = function() {
            $scope.showSearchBar = false;
        };

        $scope.toggleLeft = buildToggler('left');

        function buildToggler(navID) {
            var debounceFn = $mdUtil.debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 300);
            return debounceFn;
        }
});