'use strict';
angular.module('daksportsApp')
    .directive('gdCarousel', function($interval) {
        return {
            restrict: 'E',
            scope: {
                items: '=items',
                limit: '@gdcItems',
                start: '@gdcStart',
                xsSize:'=gdcXsSize',
                smSize:'=gdcSmSize',
                mdSize:'=gdcMdSize',
                lgSize:'=gdcLgSize'
            },
            replace: true,
            templateUrl: '/modules/carousel/carousel.tpl.html',
            controller: function($scope){
                
            },
            link: function(scope, el, attr) {
                var wrapper = el.find(".gd-carousel-wrapper");
                var i=0;
                scope.fwd = function(){
                    var item = wrapper.find("gd-carousel-item");
                    var step = parseInt(item.css("width"), 10);
                    var width = wrapper.outerWidth();
                    var visible = Math.round(width / step);
                    var maxSteps = scope.limit - visible;
                    i++;
                    (i > maxSteps) ? i = maxSteps : i=i;
                    console.log(maxSteps);
                    wrapper.css({
                        transform : 'translateX(-'+ i*step +'px)'
                    });
                };
                scope.bck = function(){
                    var item = wrapper.find("gd-carousel-item");
                    var step = parseInt(item.css("width"), 10);
                    var width = wrapper.outerWidth();
                    var visible = Math.round(width / step);
                    var maxSteps = scope.limit - visible;
                    i--;
                    (i < 0) ? i = 0 : i=i;
                    wrapper.css({
                        transform : 'translateX(-'+ i*step +'px)'
                    });
                };
            }
        }
    })
    .directive('gdCarouselItem', function() {
        return {
            restrict: 'E',
            scope: false,
            link: function(scope, el, attr) {
                el.addClass('gd-carousel-item');
            }
        }
    });