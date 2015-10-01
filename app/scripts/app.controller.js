(function() {
    'use strict';

    angular
        .module('daksportsApp')
        .controller('AppCtrl', function($http, $rootScope, $parse, $scope, $filter, $location, $mdMedia, productRes, Auth, cBrands) {

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
            
            // get structure
            
            $rootScope.brands = cBrands;

            $scope.logout = function(){
                Auth.$unauth();
            };

        });

})();
