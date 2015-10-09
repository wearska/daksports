(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('TestCtrl', function($http, $rootScope, $filter, $scope, $state, $timeout, gdShoppingLists, gdShoppingCart) {
            var api = 'api/products/';
            
            $scope.test = [];
            
            $scope.filter = function(){
                var gender = $rootScope.userData.gender;
                var shoeSize = $rootScope.userData.shoe_size;
                var topSize = $rootScope.userData.top_size;
                var pantsSize = $rootScope.userData.pants_size;
                var i = 0;
                angular.forEach($rootScope.products, function(item) {
                    if (item.gender == gender || item.gender == 0) {
                        // console.log(item.gender);
                        // console.log(item.sizes);
                        if (item.sizes) {
                            var i = 0;
                            angular.forEach(item.sizes, function(size) {
                                if (size.name == shoeSize || size.name == topSize || size.name == pantsSize && i < 1) {
                                    if (size.count > 0) {
                                        $scope.test.push(item);
                                        i++;
                                    }
                                }
                            });
                        } else if (!item.sizes) {
                            // $scope.test.push(item);
                        }
                    }
                });
            };
            
        });

})();
