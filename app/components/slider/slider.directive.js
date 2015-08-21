(function() {
  'use strict';

  angular.module('daksportsApp')
    .directive('gdSlider', function($interval) {
      return {
        restrict: 'E',
        scope: {},
        transclude: true,
        link: function(scope, el, attr, ctrl, transclude) {
          scope.slides = [
            "/uploads/slider/slide_adidas.jpg",
            "/uploads/slider/slide_nike.jpg",
            "/uploads/slider/slide_puma.jpg"
          ];
          scope.isPaused = false;
          var i = 0,
            slidesLength = scope.slides.length,
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
            (i >= slidesLength) ? i = 0: i = i;
            (i < 0) ? i = slidesLength - 1: i = i;
            el.find('.gd-slides').css("left", -i * 100 + "%");
          }

          timeoutId = $interval(function() {
            if (!scope.isPaused) {
              i++;
              updateSlide();
            }
          }, 6000);
        }
      }
    })
    .directive('gdSlide', function() {
      return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'app/components/slider/slider.tpl.html',
        link: function(scope, el, attr, ctrl, transclude) {
          scope.src = attr.gdSlideSrc;
          transclude(scope, function(clone, scope) {
            el.append(clone);
          });
        }
      }
    });

})();