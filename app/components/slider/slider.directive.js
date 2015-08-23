(function() {
    'use strict';

    angular.module('daksportsApp')
        .directive('gdSlider', function($interval) {
            return {
                restrict: 'E',
                transclude: true,
                link: function(scope, el, attr, ctrl, transclude) {
                    scope.interval = '2000';
                    scope.isPaused = false;
                    var i = 0,
                        timeoutId;
                    transclude(scope, function(clone, scope) {
                        el.append(clone);
                    });
                    scope.pauseSlider = function() {
                        scope.isPaused = true;
                    };
                    scope.playSlider = function() {
                        scope.isPaused = false;
                    };
                    scope.nextSlide = function() {
                        i++;
                        updateSlide();
                    };
                    scope.prevSlide = function() {
                        i--;
                        updateSlide();
                    };
                    el.on('$destroy', function() {
                        $interval.cancel(timeoutId);
                    });
                    
                    function updateSlide() {
                        (i >= scope.sliderLength) ? i = 0: i = i;
                        (i < 0) ? i = scope.sliderLength - 1: i = i;
                        el.find('.gd-slides').css("left", -i * 100 + "%");
                    }
                    
                    timeoutId = $interval(function() {
                        if (!scope.isPaused) {
                            i++;
                            updateSlide();
                        }
                    }, scope.interval);
                }
            }
        })
        .directive('gdSlide', function() {
            return {
                restrict: 'E',
                scope : {
                    src : "@gdSlideSrc"
                },
                transclude: true,
                templateUrl: 'app/components/slider/slider.tpl.html',
                link: function(scope, el, attr, ctrl, transclude) {
                    transclude(scope, function(clone, scope) {
                        el.append(clone);
                    });
                }
            }
        });

})();