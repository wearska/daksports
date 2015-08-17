'use strict';
angular.module('daksportsApp')
    .directive('gdCluster', function() {
        return {
            restrict: 'E',
            // controller: 'ClusterCtrl',
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
            templateUrl: '/modules/cluster/cluster.tpl.html',
            // link: function(scope, el, attr) {
            //     var wrapper = el.find(".cluster-wrapper");
            //     var i=0;
            //     scope.fwd = function(){
            //         var item = wrapper.find("cluster-item");
            //         var step = parseInt(item.css("width"), 10);
            //         var width = wrapper.outerWidth();
            //         var visible = Math.round(width / step);
            //         var maxSteps = scope.limit - visible;
            //         i++;
            //         (i > maxSteps) ? i = maxSteps : i=i;
            //         wrapper.css({
            //             transform : 'translateX(-'+ i*step +'px)'
            //         });
            //     };
            //     scope.bck = function(){
            //         var item = wrapper.find("cluster-item");
            //         var step = parseInt(item.css("width"), 10);
            //         var width = wrapper.outerWidth();
            //         var visible = Math.round(width / step);
            //         var maxSteps = scope.limit - visible;
            //         i--;
            //         (i < 0) ? i = 0 : i=i;
            //         wrapper.css({
            //             transform : 'translateX(-'+ i*step +'px)'
            //         });
            //     };
            //     console.log(scope);
            // }
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {},
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        var wrapper = iElement.find(".cluster-wrapper");
                        // var i = 0;
                        // scope.fwd = function() {
                        //     var item = wrapper.find(".cluster-item");
                        //     var step = parseInt(item.css("width"), 10);
                        //     var width = wrapper.outerWidth();
                        //     var visible = Math.round(width / step);
                        //     var maxSteps = scope.limit - visible;
                        //     i++;
                        //     (i > maxSteps) ? i = maxSteps: i = i;
                        //     wrapper.css({
                        //         transform: 'translateX(-' + i * step + 'px)'
                        //     });
                        // };
                        // scope.bck = function() {
                        //     var item = wrapper.find(".cluster-item");
                        //     var step = parseInt(item.css("width"), 10);
                        //     var width = wrapper.outerWidth();
                        //     var visible = Math.round(width / step);
                        //     var maxSteps = scope.limit - visible;
                        //     i--;
                        //     (i < 0) ? i = 0: i = i;
                        //     wrapper.css({
                        //         transform: 'translateX(-' + i * step + 'px)'
                        //     });
                        // };
                        console.log(iElement[0]);
                    }
                }
            }
        }
    });