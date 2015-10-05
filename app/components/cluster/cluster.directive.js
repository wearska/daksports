(function() {
    'use strict';

    angular.module('daksportsApp')
        .directive('gdClusterLane', function($window) {
            return function(scope, element, attrs) {
                var w = angular.element($window);
                var parent = angular.element(document.getElementById("main"));
                var wrapper = angular.element(element.find('.gd-cluster-wrapper'));

                var update = function() {
                    var parentWidth = parent.width();
                    var wrapperWidth = wrapper.width();
                    element.css({
                        "width": parentWidth,
                        "left": "-" + (parentWidth - wrapperWidth) / 2 + "px"
                    });
                }
                w.bind('resize load', function() {
                    update();
                    // scope.$apply();
                });

                scope.$watch(function() {
                    return {
                        'pw': parent.width()
                    };
                }, function(newValue, oldValue) {
                    update();
                }, true);
            };
        })
        .directive('gdCluster', function($interval) {
            return {
                restrict: 'E',
                scope: {
                    title: '@',
                    subtitle: '@',
                    image: '@gdClusterImage',
                    items: '=gdClusterItems'
                },
                replace: true,
                templateUrl: 'app/components/cluster/cluster.tpl.html',
                link: function(scope, el, attr) {
                    scope.limit = 3;
                }
            }
        });

})();