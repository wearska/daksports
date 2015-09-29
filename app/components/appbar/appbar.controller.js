(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AppBarCtrl', function($rootScope, $scope, $filter, $location, $timeout, ngCart) {

            // TOGGLE SEARCH BAR
            $scope.showSearchBar = false;
            $scope.toggleSearchBar = function() {
                $scope.showSearchBar = !$scope.showSearchBar;
            };
            $scope.hideSearchBar = function() {
                $scope.showSearchBar = false;
            };

            $scope.products = angular.copy($rootScope.products);

            $scope.goToSearch = function(){
                $location.path('search');
            }

            $scope.search = function(query){
                console.log(query);
                $rootScope.searchResults = $filter('searchProduct')($rootScope.products, query);
            }

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
