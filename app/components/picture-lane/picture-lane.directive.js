(function() {
    'use strict';

    angular.module('daksportsApp')
        .directive('gdPictureLane', function() {
            return {
                restrict: 'E',
                scope: {
                    lanePicture: '@'
                },
                controller: function($scope){
                    $scope.ctrLanePicture = 'uploads/carousels/shoes_puma.jpg'
                },
                link: function(scope, el, attr) {
                    el.addClass("gd-picture-lane");
                    console.log(scope.lanePicture);
                }
            }
        });

})();