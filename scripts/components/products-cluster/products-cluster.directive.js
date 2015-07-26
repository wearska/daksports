'use strict';

angular.module('daksportsApp')
    .directive('productsCluster', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope : {},
            templateUrl: 'templates/products-cluster.tpl.html',
            link: function(scope, el, attr, ctrl, transclude) {
                scope.title = attr.clusterTitle;
                scope.limit = attr.clusterItems;
                scope.xsitems = attr.xsItems;
                scope.sitems = attr.sItems;
                scope.mitems = attr.mItems;
                scope.litems = attr.lItems;
                scope.start = attr.startAt;
                transclude(scope, function(clone, scope) {
                    el.append(clone);
                });
            }
        };
    });