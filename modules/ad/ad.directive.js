'use strict';
angular.module('daksportsApp')
    .directive('gdAd', function() {
        return {
            restrict: 'E',
            scope: {
                adSrc: '=',
                adTitle: '=',
                adSubtitle: '='
            },
            replace: true,
            templateUrl: '/modules/ad/ad.tpl.html',
            controller: function($scope){
            },
            link: function(scope, el, attr) {
                console.log(scope)
            }
        }
    });