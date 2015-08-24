(function() {
    'use strict';

    angular
        .module('daksportsApp')
        .controller('AppCtrl', function($http, $rootScope, $parse, $scope, $filter, $location, productRes, Auth) {

            $rootScope.noNav = false;

            //   get structure
            var api = 'api/categories/';
            $scope.getBrands = function() {
                return $http.get(api + 'query.brands.php');
            };
            $scope.getMainCats = function() {
                return $http.get(api + 'query.main_cats.php');
            };
            $scope.getSubCats = function() {
                return $http.get(api + 'query.sub_cats.php');
            };

            $scope.getBrands()
                .then(function(response) {
                    $rootScope.brands = response.data;
                }).catch(function(error) {
                    return error;
                });

            $scope.getMainCats()
                .then(function(response) {
                    $rootScope.main_cats = response.data;
                }).catch(function(error) {
                    return error;
                });

            $scope.getSubCats()
                .then(function(response) {
                    $rootScope.sub_cats = response.data;
                }).catch(function(error) {
                    return error;
                });

        });

})();
