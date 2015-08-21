(function() {
  'use strict';

  angular
    .module('daksportsApp')
    .filter('searchAdminList', function() {
      return function(products, search) {
        var filtered = [];
        if (!search) {
          return products;
        }
        angular.forEach(products, function(product) {
          if (angular.lowercase(product.name).indexOf(angular.lowercase(search)) != -1 || angular.lowercase(product.subname).indexOf(angular.lowercase(search)) != -1) {
            filtered.push(product);
          }
        });
        return filtered;
      };
    })
    .filter('randomize', function() {
      return function(input, scope) {
        if (input != null && input != undefined && input > 1) {
          return Math.floor((Math.random() * input) + 1);
        }
      };
    });

})();
