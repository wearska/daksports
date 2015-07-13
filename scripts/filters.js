'use strict';

/**
 * @ngdoc overview
 * @name daksportsApp
 * @description
 * # daksportsApp
 *
 * Filters for the application.
 */
angular
    .module('daksportsApp')
    .filter('searchAdminList', function(){
        return function(products, search){
            var filtered = [];
            if(!search){
                return products;
            }
            angular.forEach(products, function(product){
                if(angular.lowercase(product.name).indexOf(angular.lowercase(search)) != -1 || angular.lowercase(product.subname).indexOf(angular.lowercase(search)) != -1){
                    filtered.push(product);
                }
            });
            return filtered;
        };
    });