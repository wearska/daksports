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
            templateUrl: '/modules/banner/banner.tpl.html',
            controller: function($scope){
            },
            link: function(scope, el, attr) {
            }
        }
    });
