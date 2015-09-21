(function() {
    'use strict';

    angular.module('daksportsApp')
        .controller('GdTable', function($http, $rootScope, $scope) {
            var scope = this;
            scope.selected = [];
            scope.predicate = 'added';
            scope.reverse = false;
            scope.allToggle = false;
            scope.toggle = function(code) {
                var idx = scope.selected.indexOf(code);
                if (idx > -1) scope.selected.splice(idx, 1);
                else scope.selected.push(code);
            };
            scope.toggleAll = function(){
                scope.allToggle = !scope.allToggle;
                if(scope.allToggle){
                    scope.selectAll();
                }else{
                    scope.removeAll();
                }
            };
            scope.selectAll = function(){
                angular.forEach($rootScope.products, function(item){
                    scope.selected.push(item.code);
                });
            };
            scope.removeAll = function(){
                scope.selected = [];
            }
            scope.exists = function(code) {
                return scope.selected.indexOf(code) > -1;
            };
            scope.reset = function() {
                scope.selected = [];
            };
            scope.setActiveSort = function(ev, column) {
                var current = scope.predicate;
                var $target = angular.element(ev.currentTarget);
                $target.parent().children().removeClass('active-sort');
                $target.addClass('active-sort');
                if (current === column) {
                    scope.predicate = "-" + column;
                    scope.reverse = !scope.reverse;
                }else{
                    scope.predicate = column;
                    scope.reverse = false;
                }
            };
        });

})();
