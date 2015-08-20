'use strict';
angular.module('daksportsApp')
    .directive('gdBanner', function() {
        return {
            restrict: 'E',
            scope: {
                bannerSrc: '=',
                bannerTitle: '=',
                bannerSubtitle: '='
            },
            replace: true,
            templateUrl: '/app/components/banner/banner.tpl.html',
            controller: function($scope){
            },
            link: function(scope, el, attr) {
            }
        }
    });
