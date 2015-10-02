(function() {
    'use strict';

    angular.module('daksportsApp')
        .directive('gdCluster', function() {
            return {
                restrict: 'E',
                scope: {
                    title: '@',
                    subtitle: '@',
                    items: '=data',
                    type: '@',
                    limit: '@',
                    start: '@',
                    xs: '@',
                    sm: '@',
                    md: '@',
                    lg: '@'
                },
                controller: function($scope) {

                },
                replace: true,
                templateUrl: 'app/components/cluster/cluster.tpl.html',
                link: function(scope, el, attr) {
                    console.log(scope);
                }
            }
        });

})();
