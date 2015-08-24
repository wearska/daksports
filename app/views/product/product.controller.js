(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('ProductCtrl', function($scope, $http, $parse, $filter, $stateParams, productRes) {
            // Initial state
            $scope.product = {};
            $scope.files = {};
            $scope.order = {
                count: 1
            };

            $scope.isFav = function() {
                var bool = true;
                return bool;
            }

            $scope.setMain = function(file) {
                file = file.replace(/(\.[\w\d_-]+)$/i, '_medium$1');
                $scope.mainView = file;
            }

            productRes.get($stateParams.productId)
                .then(function(response) {
                    var i=0;
                    $scope.product = response.data[0];
                    angular.forEach($scope.product, function(value, key){
                        if(value !== ''  & key.indexOf("file") >= 0){
                            i++;
                            $scope.sliderLength = i;
                            value = value.replace(/(\.[\w\d_-]+)$/i, '_medium$1');
                            var model = $parse(key);
                            model.assign($scope.files, value);
                        }
                    });
                    $scope.product.sizes = [
                        "XS",
                        "S",
                        "M",
                        "L",
                        "XL"
                    ];
                    $scope.product.colours = [
                        "Rosu",
                        "Galben",
                        "Albastru"
                    ];
                }).catch(function(error) {
                    return error;
                });
        });

})();
