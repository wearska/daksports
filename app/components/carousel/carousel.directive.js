(function() {
    'use strict';

    angular.module('daksportsApp')
        .directive('gdCarousel', function($interval) {
            return {
                restrict: 'E',
                scope: {
                    items: '=data',
                    tiles: '=gdTiles',
                    title: '@',
                    subtitle: '@',
                    limit: '=',
                    start: '@',
                    promoFilter: '@',
                    length: '=carouselLength',
                    xs: '=',
                    sm: '=',
                    md: '=',
                    lg: '='
                },
                replace: true,
                templateUrl: 'app/components/carousel/carousel.tpl.html',
                controller: function($scope) {

                },
                link: function(scope, el, attr) {
                    var wrapper = el.find(".gd-carousel-lane");
                    var i = 0;
                    scope.atStart = true;
                    scope.atEnd = false;
                    scope.fwd = function() {
                        var item = wrapper.find("gd-carousel-item");
                        var step = parseInt(item.css("width"), 10);
                        var width = wrapper.outerWidth();
                        var visible = Math.round(width / step);
                        var maxSteps = scope.limit - visible;
                        console.log(maxSteps);
                        i++;
                        console.log(i);
                        if (i <= maxSteps) {
                            wrapper.css({
                                left: -i * step + 'px'
                            });
                            scope.atStart = false;
                            (i == maxSteps) ? scope.atEnd = true: scope.atEnd = false;
                        } else {
                            i = maxSteps;
                        }
                    };
                    scope.bck = function() {
                        var item = wrapper.find("gd-carousel-item");
                        var step = parseInt(item.css("width"), 10);
                        var width = wrapper.outerWidth();
                        var visible = Math.round(width / step);
                        var maxSteps = scope.limit - visible;
                        i--;
                        if (i >= 0) {
                            wrapper.css({
                                left: -i * step + 'px'
                            });
                            scope.atEnd = false;
                            (i == 0) ? scope.atStart = true: scope.atStart = false;
                        } else {
                            i = 0;
                        }
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

})();