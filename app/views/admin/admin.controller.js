(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('AdminCtrl', function($scope, $rootScope, $mdDialog) {
            
            //hide the nvigation menu
            $rootScope.noNav = true;
            $scope.$on('$destroy', function() {
                $rootScope.noNav = false;
            });
            
            //set product available colours
            $scope.colours = [
                'black',
                'white',
                'brown',
                'red',
                'orange',
                'gold',
                'yellow',
                'green',
                'teal',
                'cyan',
                'blue',
                'indigo',
                'violet',
                'pink'
            ];
            
            // colour click function
            $scope.addColour = function(ev, colour) {
                var el = angular.element(ev.currentTarget);
                if (el.hasClass("active")) {
                    el.removeClass("active");
                    var index = $scope.product.colours.indexOf(colour);
                    $scope.product.colours.splice(index, 1);
                } else {
                    el.addClass("active");
                    $scope.product.colours.push(colour);
                }
                console.log($scope.product.colours);
            }
        });

})();