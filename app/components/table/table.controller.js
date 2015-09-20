(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('GdTable', function($http, $rootScope, $scope) {
            this.selected = [];
            this.toggle = function(code) {
                var idx = this.selected.indexOf(code);
                if (idx > -1) this.selected.splice(idx, 1);
                else this.selected.push(code);
            };
            this.isActive = function(code) {
                return this.selected.indexOf(code) > -1;
            };
            this.reset = function() {
                this.selected = [];
            }
        });

})();