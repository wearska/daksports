(function() {
    'use strict';

    angular
        .module('daksportsApp')
        .controller('AppCtrl', function($http, $rootScope, $parse, $scope, $filter, $location, $mdMedia, productRes, Auth) {

            $rootScope.noNav = false;
            $rootScope.mainScrolled = true;
            $rootScope.scrolledBottom = false;

            // screen size

            // sidebar toggle

            $scope.sidebarOpen = $mdMedia('gt-sm');
            $scope.toggleSidebar = function(){
                $scope.sidebarOpen = !$scope.sidebarOpen;
            }

            $scope.sliderLength = 5;

            //   get structure
            var api = 'api/categories/';
            $scope.getBrands = function() {
                return $http.get(api + 'query.brands.php');
            };
            $scope.getTypes = function() {
                return $http.get(api + 'query.types.php');
            };
            $scope.getKinds = function() {
                return $http.get(api + 'query.kinds.php');
            };
            $scope.getTypes = function() {
                return $http.get(api + 'query.types.php');
            };
            $scope.getKinds = function() {
                return $http.get(api + 'query.kinds.php');
            };

            $scope.getBrands()
                .then(function(response) {
                    $rootScope.brands = response.data;
                }).catch(function(error) {
                    return error;
                });

            $scope.getTypes()
                .then(function(response) {
                    $rootScope.types = response.data;
                }).catch(function(error) {
                    return error;
                });

            $scope.getKinds()
                .then(function(response) {
                    $rootScope.kinds = response.data;
                }).catch(function(error) {
                    return error;
                });

            $scope.getTypes()
                .then(function(response) {
                    $rootScope.types = response.data;
                }).catch(function(error) {
                    return error;
                });

            $scope.getKinds()
                .then(function(response) {
                    $rootScope.kinds = response.data;
                }).catch(function(error) {
                    return error;
                });

            $scope.logout = function(){
                Auth.$unauth();
            };

        });

})();
