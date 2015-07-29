'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:CarouselCtrl
 * @description
 * # CarouselCtrl
 * Controller of the daksportsApp
 */
angular.module('daksportsApp')
    .controller('CarouselCtrl', function($scope, $http, $filter, productRes) {
        this.carouselPos = 0;
        var pos = this.carouselPos;
        this.next = function(files){
            pos = pos + 33.33333333;
            console.log(files);
        };
    });
