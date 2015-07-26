'use strict';

angular.module('daksportsApp')
.directive('productsCluster', function() {
  return {
    restrict: 'E',
    transclude: false,
    templateUrl: '/scripts/components/products-cluster/products-cluster.tpl.html'
  };
});