'use strict';

/**
 * @ngdoc function
 * @name daksportsApp.controller:nav
 * @description
 * # nav
 * Factory of the daksportsApp
 */
angular.module('daksportsApp')
    .factory('nav', function navFactory($http) {
        var obj = {
            navOpen: false,
            toggleNav: function() {
                obj.navOpen = !obj.navOpen;
            }
        };
        return obj;
    });
